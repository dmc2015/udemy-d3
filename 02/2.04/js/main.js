/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.4 - Adding SVGs with D3
*/

var svg = d3.select("#chart-area").append("svg")
  .attr("width", 500)
  .attr("height", 400)

svg.append("rect")
  .attr("x", 10)
  .attr("y", 20)
  .attr("width", 30)
  .attr("height", 20)

svg.append("ellipse")
  .attr("cx", 70)
  .attr("cy", 50)
  .attr("rx", 30)
  .attr("ry", 20)
  .attr("fill", "red")

svg.append("circle")
  .attr("cx", 170)
  .attr("cy", 50)
  .attr("r", 30)
  .attr("fill", "blue")

svg.append("line")
  .attr("x1", 20)
  .attr("x2", 50)
  .attr("y1", 10)
  .attr("y1", 100)
  .attr("stroke", "black")

svg.append("text")
  .attr("x", 75)
  .attr("y", 40)
  .attr("fill", "black")
  .attr("font-size", 25)
  .text("text")



