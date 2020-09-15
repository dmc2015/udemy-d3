/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.2 - Linear scales
*/





var svg = d3.select("#chart-area")
  .append("svg")
  .attr("height", 500)
  .attr("width", 500)

d3.json("data/buildings.json").then( function(data) {
  data.forEach(function(datum){
    datum.height = +datum.height
  })

var y = d3.scaleLinear()
  .domain([0, 828])
  .range([0, 400]);

var y = d3.scaleLinear()
  .domain([
    d3.min(data, function(d){ d.height}),
    d3.max(data, function(d){ d.height})
  ])
  .range([0, 400])

  var y = d3.scaleLinear()
  .domain( [0, d3.max(data, function(d) { return d.height })] )
  .range([0, 400])

// Logrithmic scale no 0
var x = d3.scaleLog()
  .domain([
    d3.min(data, function(d){ d.height}),
    d3.max(data, function(d){ d.height})
  ])
  .range([0, 400])
  .base(10)

  // Logrithmic scale with 0
  // https://stackoverflow.com/questions/40438911/logarithmic-scale-returns-nan
// var x = d3.scaleSymlog()
//   .domain([0, 1500])
//   .range( [400])
//   .base(10)

var timeX = d3.scaleTime()
  .domain([new Date(2000, 0, 1), new Date(2001, 0, 1)])
  .range([0, 400])

var ordinalScale = d3.scaleOrdinal()
  .domain(["AFRICAN", "AMERICA", "AUSTRAILIA"])
  .range(["RED", "GREEN", "BLUE"])

var ordinalScale = d3.scaleOrdinal()
  .domain(["AFRICAN", "AMERICA", "AUSTRAILIA"])
  .range(d3.schemeCategory10)

// Used to space out rectangles when we want to make bar charts
var bandScale = d3.scaleBand()
  .domain(data.map( function(d) {  d.name }))
  .range([0, 400])
  .paddingInner(0.3)
  .paddingOuter(0.2)

  var xBandScale = d3.scaleBand()
    .domain(data.map(function(d) {
      return d.name
    }))
  .range([0, 400])
  .paddingInner(0.3)
  .paddingOuter(0.3)


var rects = svg.selectAll("rect")
  .data(data)

rects.enter()
  .append("rect")
  .attr("y", 20)
  .attr("x", function(d, i){
    return xBandScale(d.name)
  })
  .attr("width", xBandScale.bandwidth)
  .attr("height", function(d) {
    return y(d.height)
  })
  .attr("fill", function() { return 'gray' })

}).catch(function(err) {
  console.log(err)
})



















// var svg = d3.select("#chart-area")
//     .append("svg")
//         .attr("width", "400")
//         .attr("height", "400");

// d3.json("data/buildings.json").then(function(data){
//     console.log(data);

//     data.forEach(d => {
//         d.height = +d.height;
//     });

//     var y = d3.scaleLinear()
//         .domain([0, 828])
//         .range([0, 400]);

//     var rects = svg.selectAll("rect")
//             .data(data)
//         .enter()
//             .append("rect")
//             .attr("y", 0)
//             .attr("x", function(d, i){
//                 return (i * 60);
//             })
//             .attr("width", 40)
//             .attr("height", function(d){
//                 return y(d.height);
//             })
//             .attr("fill", function(d) {
//                 return "grey";
//             });

// });



