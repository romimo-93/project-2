var width = 960,
    height = 500;

var projection = d3.geoOrthographic()
    .scale(248)
    .clipAngle(90);

var path = d3.geoPath()
    .projection(projection);

var worldElem = d3.select("#world-tour");
// var graticule = d3.geo.graticule()
//     .extent([[-180, -90], [180 - .1, 90 - .1]]);

function gotoWorld(date) {

    worldElem.html("");

    var svg = worldElem.append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("circle")
        .attr("class", "graticule-outline")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", projection.scale());

    var tooltip = d3.select("#world-tour").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("width", 600);

    d3.json("/static/js/readme-world-110m.json", function (error, world) {
        var countries = topojson.object(world, world.objects.countries).geometries,
            i = -1,
            n = countries.length;

        // console.log(countries);

        var country = svg.selectAll(".country")
            .data(countries)
            .enter().insert("path", ".graticule")
            .attr("class", "country")
            .attr("d", path)
            .on("mouseover", function (d) {
                var locations = subset.filter(row => row["Country"] === d.id).map(row => row["Location"]);
                if (locations.length > 0) {
                    var tip = "<h3>" + d.id + "</h3><p>" + locations + "</p>";
                    tooltip.html(tip)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY) + "px");

                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 1);
                } else {
                    tooltip.html("");
                }
            });

        var subset = [];
        var countriesArr = [];
        var accidentArr = [];

        d3.csv("/static/airline_accident_data/airline_accidents.csv", (error, csv) => {
            subset = csv.filter(row => row["Event Date"] === date);
            //.map(row => [row["Country"], row["Location"]]);
            // var subset = csv.filter(row => row["Event Date"] === date).map(function (row) { return { country = row["Country"] };});

            // console.log(subset);

            if (subset.length > 0) {
                countriesArr = subset.map(row => row["Country"]);
            }

            countriesArr = Array.from(new Set(countriesArr));
            // console.log(countriesArr);

            countriesArr.forEach(countryName => {
                var cond = (element) => element.id.toUpperCase() == countryName.toUpperCase();
                // console.log("country:" + countryName + ", locations:" + subset.filter(row => row["Country"] === countryName).map(row => row["Location"]));
                accidentArr.push(world.objects.countries.geometries.findIndex(cond));
            });

            step();

        })

        function step() {
            if (++i >= accidentArr.length) {
                i = 0;
            }
            var countryIndex = accidentArr[i];

            country.transition()
                .style("fill", function (d, j) { return j === countryIndex ? "red" : "#b8b8b8"; });

            d3.transition()
                .delay(250)
                .duration(3250)
                .tween("rotate", function () {
                    var point = d3.geoCentroid(countries[countryIndex]),
                        rotate = d3.interpolate(projection.rotate(), [-point[0], -point[1]]);
                    return function (t) {
                        projection.rotate(rotate(t));
                        country.attr("d", path);
                    };
                })
                .transition()
                .on("end", step);
        }
    });
}