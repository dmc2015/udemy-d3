/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

var svg = d3.select("#chart-area").append("svg")
.attr("width", 500)
.attr("height", 500)


d3.json('data/buildings.json').then( function(data, i) {
  for(d in data){
    d.height = +d.height
  }


  var rects = svg.selectAll("rect")
    .data(data)

  rects.enter()
    .append("rect")
    .attr('x', function(d, i){
      return i * 70
    })
    .attr('y', function(d, i){
      return 20
    })
    .attr('width', function(d, i){
      return 30
    })
    .attr('height', function(d, i){
      return d.height * .5
    })
    .attr('fill', function(d, i){
      return (d.height * 3) % 2 == 0 ? "red" : "green"
    })
}).catch(function(e) {
  console.log("ERROR: " + e)
})



