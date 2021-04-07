var width = 960,
    height = 136,
    cellSize = 17;


var color = d3.scaleQuantize()
    .domain([0, 45])
    .range(["#FFFFFF", "#FFFAF9", "#FFF6F4", "#FFF1EE", "#FFEDE8", "#FFE8E3", "#FFE3DD", "#FFDFD7", "#FFDAD2", "#FFD5CC", "#FFD1C6", "#FFCCC1", "#FFC8BB", "#FFC3B5", "#FFBEB0", "#FFBAAA", "#FFB5A4", "#FFB09F", "#FFAC99", "#FFA793", "#FFA38E", "#FF9E88", "#FF9982", "#FF957D", "#FF9077", "#FF8B71", "#FF876C", "#FF8266", "#FF7E60", "#FF795B", "#FF7455", "#FF704F", "#FF6B4A", "#FF6744", "#FF623E", "#FF5D39", "#FF5933", "#FF542D", "#FF4F28", "#FF4B22", "#FF461C", "#FF4217", "#FF3D11", "#FF380B", "#FF3406", "#FF2F00"]);

var svgNTSB = d3.select("#ntsb")
    .selectAll("svg")
    .data(d3.range(1964, 2008))
    .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

var svgFAA = d3.select("#faa")
    .selectAll("svg")
    .data(d3.range(1964, 2021))
    .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svgNTSB.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .text(d => d);

svgFAA.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .text(d => d);

var rectNTSB = svgNTSB.append("g")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .selectAll("rect")
    .data(d => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
    .enter().append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", d => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
    .attr("y", d => d.getDay() * cellSize)
    .datum(d3.timeFormat("%m/%d/%Y"));

var rectFAA = svgFAA.append("g")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .selectAll("rect")
    .data(d => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
    .enter().append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", d => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
    .attr("y", d => d.getDay() * cellSize)
    .datum(d3.timeFormat("%m/%d/%Y"));

svgNTSB.append("g")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .selectAll("path")
    .data(d => d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
    .enter().append("path")
    .attr("d", pathMonth);

svgFAA.append("g")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .selectAll("path")
    .data(d => d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
    .enter().append("path")
    .attr("d", pathMonth);

d3.queue(2)
    .defer(d3.csv, "/static/airline_accident_data/airline_accidents.csv")
    .defer(d3.csv, "/static/airline_accident_data/faa_incidents_data.csv")
    .await(main);

function main(error, ntsb, faa) {
    if (error) throw error;

    var dataNTSB = d3.nest()
        .key(d => d["Event Date"])
        .rollup(v => v.length, d => d["Event Date"])
        .object(ntsb);

    var dataFAA = d3.nest()
        .key(d => d["Event Date"])
        .rollup(v => v.length, d => d["Event Date"])
        .object(faa);

    rectNTSB.filter(d => d in dataNTSB)
        .attr("fill", d => color(dataNTSB[d]))
        .append("title")
        .text(d => `${d}: ${dataNTSB[d]} Accidents`);
    rectNTSB.on("click", gotoWorld);

    rectFAA.filter(d => d in dataFAA)
        .attr("fill", d => color(dataFAA[d]))
        .append("title")
        .text(d => `${d}: ${dataFAA[d]} Accidents`);
    rectFAA.on("click", gotoWorld);
};

function gotoWorld(date) {
    window.open("world_tour?date=" + date);
}


function pathMonth(t0) {
    var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
        d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
        d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
    return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
        + "H" + w0 * cellSize + "V" + 7 * cellSize
        + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
        + "H" + (w1 + 1) * cellSize + "V" + 0
        + "H" + (w0 + 1) * cellSize + "Z";
}