var width = 960,
height = 500;

var projection = d3.geoOrthographic()
.scale(248)
.clipAngle(90);

var path = d3.geoPath()
.projection(projection);

// var graticule = d3.geo.graticule()
//     .extent([[-180, -90], [180 - .1, 90 - .1]]);

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height);

svg.append("circle")
.attr("class", "graticule-outline")
.attr("cx", width / 2)
.attr("cy", height / 2)
.attr("r", projection.scale());

d3.json("/static/js/readme-world-110m.json", function (error, world) {
var countries = topojson.object(world, world.objects.countries).geometries,
    i = -1,
    n = countries.length;

var country = svg.selectAll(".country")
    .data(countries)
    .enter().insert("path", ".graticule")
    .attr("class", "country")
    .attr("d", path);

var locations = ["Taiwan", "United States"];

var accidentArr = [];

locations.forEach(loca => 
{
    var cond = (element) => element.id == loca;
    accidentArr.push(world.objects.countries.geometries.findIndex(cond));
});            

step();

function step() {
    if (++i >= accidentArr.length) {
        i = 0;
    }
    var location = accidentArr[i];

    country.transition()
        .style("fill", function (d, j) { return j === location ? "red" : "#b8b8b8"; });

    d3.transition()
        .delay(250)
        .duration(1250)
        .tween("rotate", function () {
            var point = d3.geoCentroid(countries[location]),
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
