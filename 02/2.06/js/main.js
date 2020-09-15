/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.6 - Selections and data joins
*/

var data = [25, 20, 10, 12, 15];


var svg = d3.select("#chart-area").append("svg")
  .attr("width", "400")
  .attr("height", "400")

var circle = svg.selectAll("circle")
  .data(data)

circle.enter()
  .append("circle")
  .attr("cx", function(d, i){
    return d * 15
  })
  .attr("cy", function(d, i) {
    return d * 2
  })
  .attr("r", function(d, i){
    return d
  })
  .attr("fill", function(d, i){
    return d % 2 == 0 ? "red" : "blue"
  })












































// var svg = d3.select("#chart-area").append("svg")
//     .attr("width", 400)
//     .attr("height", 400);

// var circles = svg.selectAll("circle")
//     .data(data);

// circles.enter()
//     .append("circle")
//         .attr("cx", function(d, i){
//             return (i * 50) + 25;
//         })
//         .attr("cy", 25)
//         .attr("r", function(d){
//             return d;
//         })
//         .attr("fill", "red");
