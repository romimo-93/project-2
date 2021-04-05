var width = 960,
    height = 136,
    cellSize = 17;

    

var color = d3.scaleQuantize()
    .domain([0, 45])
    .range(["#FFFFFF", "#FFFAF9", "#FFF6F4", "#FFF1EE", "#FFEDE8", "#FFE8E3", "#FFE3DD", "#FFDFD7", "#FFDAD2", "#FFD5CC", "#FFD1C6", "#FFCCC1", "#FFC8BB", "#FFC3B5", "#FFBEB0", "#FFBAAA", "#FFB5A4", "#FFB09F", "#FFAC99", "#FFA793", "#FFA38E", "#FF9E88", "#FF9982", "#FF957D", "#FF9077", "#FF8B71", "#FF876C", "#FF8266", "#FF7E60", "#FF795B", "#FF7455", "#FF704F", "#FF6B4A", "#FF6744", "#FF623E", "#FF5D39", "#FF5933", "#FF542D", "#FF4F28", "#FF4B22", "#FF461C", "#FF4217", "#FF3D11", "#FF380B", "#FF3406", "#FF2F00"]);

var svg = d3.select("body")
    .selectAll("svg")
    .data(d3.range(1964, 2008))
    .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

var rect = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .selectAll("rect")
    .data(function(d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
    .attr("y", function(d) { return d.getDay() * cellSize; })
    .datum(d3.timeFormat("%m/%d/%Y"));

svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .selectAll("path")
    .data(function(d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("path")
    .attr("d", pathMonth);

d3.csv("/static/airline_accident_data/airline_accidents.csv", function(error, csv) {
    if (error) throw error;

    var data = d3.nest()
        .key(d => d["Event Date"])
        .rollup(v => v.length, d => d["Event Date"])
        .object(csv);
      
        console.log(data);

    rect.filter(function(d) { return d in data; })
        .attr("fill", function(d) { return color(data[d]); })
        .append("title")
        .text(function(d) { return d + ": " + data[d]; });
});

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