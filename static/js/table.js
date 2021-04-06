

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "AirportCode";

// function used for updating x-scale var upon click on axis label
function xScale(airportData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(airportData, d => d[chosenXAxis]) * 0.8,
      d3.max(airportData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "AirportCode") {
    label = "Airport Code";
  }
  else {
    label = "Location";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d['Airport Code']}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("/static/airline_accident_data/airline_accidents.csv", function(error, tableData) {
  if (error) throw err;

  // parse data
  tableData.forEach(function(data) {
    data['Airport Code'] = data['Airport Code'];
    data['Total Fatal Injuries'] = +data['Total Fatal Injuries'];
    // data['Location'] = +data['Location'];
    // console.log(data['Airport Code']);
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(tableData, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(tableData, d => d.num_hits)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(tableData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.num_hits))
    .attr("r", 20)
    .attr("fill", "pink")
    .attr("opacity", ".5");

  // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  // var locationLabel = labelsGroup.append("text")
  //   .attr("x", 0)
  //   .attr("y", 20)
  //   .attr("value", "location") // value to grab for event listener
  //   .classed("active", true)
  //   .text("Location");

  var codeLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "airportCode") // value to grab for event listener
    .classed("inactive", true)
    .text("Airport Code");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Number of Fatal Injuries");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(tableData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "airportCode") {
          codeLabel
            .classed("active", true)
            .classed("inactive", false);
          // locationLabel
          //   .classed("active", false)
          //   .classed("inactive", true);
        }
        else {
          codeLabel
            .classed("active", false)
            .classed("inactive", true);
          // locationLabel
          //   .classed("active", true)
          //   .classed("inactive", false);
        }
      }
    });
})
// .catch(function(error) {
//   console.log(error);
// });


// var chart = {
//     var width = 960,
//         height = 500,
//         parseDate = d3.time.format("%x").parse;

//     var color = d3.time.scale()
//         .domain([new Date(1962, 0, 1), new Date(2006, 0, 1)])
//         .range(["black", "steelblue"])
//         .interpolate(d3.interpolateLab);
//     var hexbin = d3.hexbin()
//         .size([width, height])
//         .radius(8);
    
//     var radius = d3.scale.sqrt()
//         .domain([0, 12])
//         .range([0, 8]);
    
//     var projection = d3.geo.albers()
//         .scale(1000)
//         .translate([width / 2, height / 2])
//         .precision(.1);
    
//     var path = d3.geo.path()
//         .projection(projection);
    
//     var svg = d3.select("body").append("svg")
//         .attr("width", width)
//         .attr("height", height);

//     d3.queue(1)
//         .defer(d3.csv, "/static/airline_accident_data/airline_accidents.csv")
//         .await(ready);

// function ready(error, airlines) {
//     if (error) throw error;
    
//     airlines.forEach(function(d) {
//         var p = projection(d);
//         d[0] = p[0], d[3] = p[3];
//         d.date = parseDate(d.date);
//     });

//     svg.append("path")
//       .datum(topojson.feature(us, us.objects.land))
//       .attr("class", "land")
//       .attr("d", path);

//   svg.append("path")
//       .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
//       .attr("class", "states")
//       .attr("d", path);

//   svg.append("g")
//       .attr("class", "hexagons")
//     .selectAll("path")
//       .data(hexbin(walmarts).sort(function(a, b) { return b.length - a.length; }))
//     .enter().append("path")
//       .attr("d", function(d) { return hexbin.hexagon(radius(d.length)); })
//       .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
//       .style("fill", function(d) { return color(d3.median(d, function(d) { return +d.date; })); });
// }

// !function(){d3.hexbin=function(){function u(n){var r={};return n.forEach(function(n,t){var a=s.call(u,n,t)/o,e=Math.round(a),c=h.call(u,n,t)/i-(1&e?.5:0),f=Math.round(c),l=a-e;if(3*Math.abs(l)>1){var v=c-f,g=f+(f>c?-1:1)/2,m=e+(e>a?-1:1),M=c-g,d=a-m;v*v+l*l>M*M+d*d&&(f=g+(1&e?1:-1)/2,e=m)}var j=f+"-"+e,p=r[j];p?p.push(n):(p=r[j]=[n],p.i=f,p.j=e,p.x=(f+(1&e?.5:0))*i,p.y=e*o)}),d3.values(r)}function a(r){var t=0,u=0;return n.map(function(n){var a=Math.sin(n)*r,e=-Math.cos(n)*r,i=a-t,o=e-u;return t=a,u=e,[i,o]})}var e,i,o,c=1,f=1,h=r,s=t;return u.x=function(n){return arguments.length?(h=n,u):h},u.y=function(n){return arguments.length?(s=n,u):s},u.hexagon=function(n){return arguments.length<1&&(n=e),"m"+a(n).join("l")+"z"},u.centers=function(){for(var n=[],r=0,t=!1,u=0;f+e>r;r+=o,t=!t,++u)for(var a=t?i/2:0,h=0;c+i/2>a;a+=i,++h){var s=[a,r];s.i=h,s.j=u,n.push(s)}return n},u.mesh=function(){var n=a(e).slice(0,4).join("l");return u.centers().map(function(r){return"M"+r+"m"+n}).join("")},u.size=function(n){return arguments.length?(c=+n[0],f=+n[1],u):[c,f]},u.radius=function(n){return arguments.length?(e=+n,i=2*e*Math.sin(Math.PI/3),o=1.5*e,u):e},u.radius(1)};var n=d3.range(0,2*Math.PI,Math.PI/3),r=function(n){return n[0]},t=function(n){return n[1]}}();

  //   var svg = d3
  //       .select(".container")
  //       .append("svg")
  //       .attr("width")
  //       .attr("height")
  
  //   var chart = svg.append("g")
  //       .attr("transform", "translate(610,20)")
  //       .append(() => legend({
  //         color, 
  //         title: data.title, 
  //         width: 260, 
  //         tickValues: d3.utcYear.every(5).range(...color.domain()),
  //         tickFormat: d3.utcFormat("%Y")
  //       }));
  
  //   svg.append("path")
  //       .datum(topojson.mesh(us, us.objects.states))
  //       .attr("fill", "none")
  //       .attr("stroke", "#777")
  //       .attr("stroke-width", 0.5)
  //       .attr("stroke-linejoin", "round")
  //       .attr("d", d3.geoPath());
  
  //   svg.append("g")
  //     .selectAll("path")
  //     .data(data)
  //     .join("path")
  //       .attr("transform", d => `translate(${d.x},${d.y})`)
  //       .attr("d", d => hexbin.hexagon(radius(d.length)))
  //       .attr("fill", d => color(d.date))
  //       .attr("stroke", d => d3.lab(color(d.date)).darker())
  //     .append("title")
  //       .text(d => `${d.length.toLocaleString()} stores
  // ${d.date.getFullYear()} median opening`);
  
  //   return svg.node();
  // }


    
  //   const data = d3.csv("/static/airline_accident_data/airline_accidents.csv".text(), d => {
  //     const p = projection(d);
  //     p.date = parseDate(d.date);
  //     return p;
  //   });

  //   return Object.assign(
  //     hexbin(data)
  //       .map(d => (d.date = new Date(d3.median(d, d => d.date)), d))
  //       .sort((a, b) => b.length - a.length),
  //     {title: "Median opening year"}
  //   );


// d3.csv("/static/airline_accident_data/airline_accidents.csv", function(tableData) {
//   // console.log(tableData);
//   const tbody = d3.select("tbody");

//   // First, clear out any existing data
//   tbody.html("");

//   // Next, loop through each object in the data
//   // and append a row and cells for each value in the row
//   var fields = ["Event Date", "Location", "Country", "Airport Code", "Airport Name", "Injury Severity", "Total Fatal Injuries"];

//   tableData.forEach((dataRow) => {
//     // Append a row to the table body
//     const row = tbody.append("tr");

//     // Loop through each field in the dataRow and add
//     // each value as a table cell (td)

//     Object.values(dataRow).forEach((key, value) => {
//       if (key in fields) {
//         row.append("td", value);
//         console.log("true");
//       }
//     });
//   });
// });

// // get table references


// function handleClick() {

//   // Grab the datetime value from the filter
//   const code = d3.select("Airport Code").property("value");
//   let filteredData = tableData;

//   // Check to see if a date was entered and filter the
//   // data using that date.
//   if (code) {
//     // Apply `filter` to the table data to only keep the
//     // rows where the `datetime` value matches the filter value
//     filteredData = filteredData.filter(row => row.planecode === code);
//   }

//   // Rebuild the table using the filtered data
//   // @NOTE: If no date was entered, then filteredData will
//   // just be the original tableData.
//   buildTable(filteredData);
// }

// // Attach an event to listen for the form button
// d3.selectAll("#filter-btn").on("click", handleClick);

// // Build the table when the page loads
// // buildTable(tableData);


// const width = 960;
// const height = 600;

// div = d3.select('#container');
// mapLayer = div.append('svg').attr('id', 'map').attr('width', width).attr('height', height);
// canvasLayer = div.append('canvas').attr('id', 'heatmap').attr('width', width).attr('height', height);


// var canvas = canvasLayer.node(),
//     context = canvas.getContext("2d");
//     context.globalAlpha = 0.5;

// var projection = d3.geoMercator().translate([width/2, height/2]),
//     path = d3.geoPath(projection),
//     airportMap;

// d3.queue()
//     // .defer(d3.json, 'world-50m.json')
//     // .defer(d3.json, 'airports.json')
//     .defer(d3.csv, '/static/airline_accident_data/airline_accidents.csv')
//     // .defer(d3.csv, 'flexwatch.csv')
//     .await(main);


// function main(error, data) {

//     .forEach(d => { d.coords = projection([d.longitude, d.latitude]); })
//     airportMap = d3.map(airports, d => d.id);

//     var countries = topojson.feature(world, world.objects.countries).features;

//     mapLayer
//         .append('g')
//         .classed('countries', true)
//         .selectAll(".country")
//           .data(countries)
//         .enter()
//           .append("path")
//           .attr("class", "country")
//           .attr("d", path);

//     mapLayer
//       .append('g')
//       .classed('airports', true)
//       .selectAll('.airport')
//         .data(airports)
//       .enter().append('circle')
//         .attr('r', 1)
//             .attr('cx', function(d) { return d.coords && d.coords[0]; })
//             .attr('cy', function(d) { return d.coords && d.coords[1]; })

//     var heat = simpleheat(canvas);

//     // set data of [[x, y, value], ...] format
//     heat.data(dests.map(d => {a = airportMap.get(d.destination); return [a.coords[0], a.coords[1], +d.watches]}));

//     // set point radius and blur radius (25 and 15 by default)
//     heat.radius(10, 10);

//     // optionally customize gradient colors, e.g. below
//     // (would be nicer if d3 color scale worked here)
//     // heat.gradient({0: '#0000ff', 0.5: '#00ff00', 1: '#ff0000'});

//     // set maximum for domain
//     heat.max(d3.max(dests, d => +d.watches));

//     // draw into canvas, with minimum opacity threshold
//     heat.draw(0.05);
// }

// if (typeof module !== 'undefined') module.exports = simpleheat;

// function simpleheat(canvas) {
//     if (!(this instanceof simpleheat)) return new simpleheat(canvas);

//     this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

//     this._ctx = canvas.getContext('2d');
//     this._width = canvas.width;
//     this._height = canvas.height;

//     this._max = 1;
//     this._data = [];
// }

// simpleheat.prototype = {

//     defaultRadius: 25,

//     defaultGradient: {
//         0.4: 'blue',
//         0.6: 'cyan',
//         0.7: 'lime',
//         0.8: 'yellow',
//         1.0: 'red'
//     },

//     data: function (data) {
//         this._data = data;
//         return this;
//     },

//     max: function (max) {
//         this._max = max;
//         return this;
//     },

//     add: function (point) {
//         this._data.push(point);
//         return this;
//     },

//     clear: function () {
//         this._data = [];
//         return this;
//     },

//     radius: function (r, blur) {
//         blur = blur === undefined ? 15 : blur;

//         // create a grayscale blurred circle image that we'll use for drawing points
//         var circle = this._circle = this._createCanvas(),
//             ctx = circle.getContext('2d'),
//             r2 = this._r = r + blur;

//         circle.width = circle.height = r2 * 2;

//         ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
//         ctx.shadowBlur = blur;
//         ctx.shadowColor = 'black';

//         ctx.beginPath();
//         ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
//         ctx.closePath();
//         ctx.fill();

//         return this;
//     },

//     resize: function () {
//         this._width = this._canvas.width;
//         this._height = this._canvas.height;
//     },

//     gradient: function (grad) {
//         // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
//         var canvas = this._createCanvas(),
//             ctx = canvas.getContext('2d'),
//             gradient = ctx.createLinearGradient(0, 0, 0, 256);

//         canvas.width = 1;
//         canvas.height = 256;

//         for (var i in grad) {
//             gradient.addColorStop(+i, grad[i]);
//         }

//         ctx.fillStyle = gradient;
//         ctx.fillRect(0, 0, 1, 256);

//         this._grad = ctx.getImageData(0, 0, 1, 256).data;

//         return this;
//     },

//     draw: function (minOpacity) {
//         if (!this._circle) this.radius(this.defaultRadius);
//         if (!this._grad) this.gradient(this.defaultGradient);

//         var ctx = this._ctx;

//         ctx.clearRect(0, 0, this._width, this._height);

//         // draw a grayscale heatmap by putting a blurred circle at each data point
//         for (var i = 0, len = this._data.length, p; i < len; i++) {
//             p = this._data[i];
//             ctx.globalAlpha = Math.min(Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity), 1);
//             ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
//         }

//         // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
//         var colored = ctx.getImageData(0, 0, this._width, this._height);
//         this._colorize(colored.data, this._grad);
//         ctx.putImageData(colored, 0, 0);

//         return this;
//     },

//     _colorize: function (pixels, gradient) {
//         for (var i = 0, len = pixels.length, j; i < len; i += 4) {
//             j = pixels[i + 3] * 4; // get gradient color from opacity value

//             if (j) {
//                 pixels[i] = gradient[j];
//                 pixels[i + 1] = gradient[j + 1];
//                 pixels[i + 2] = gradient[j + 2];
//             }
//         }
//     },

    // _createCanvas: function () {
//         if (typeof document !== 'undefined') {
            // return document.createElement('canvas');
//         } else {
//             // create a new canvas instance in node.js
//             // the canvas class needs to have a default constructor without any parameter
//             return new this._canvas.constructor();
//         }
//     }
// };

