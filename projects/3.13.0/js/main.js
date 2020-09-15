/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/


var margin = { left: 100, top: 10, bottom: 150, right: 10}

var height = 600 - margin.bottom - margin.top,
    width = 600 - margin.right - margin.left


var g = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

g.append("text")
  .attr("class", "x axis-label")
  .attr("x", width / 2)
  .attr("y", height + 75)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Months")

g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (height / 2))
  .attr("y", -60 )
  .attr("text-anchor", "middle")
  .attr("font-size", "20px")
  .text("Revenue")
  .attr("transform", "rotate(-90)")


d3.json("./data/revenues.json").then( function(data) {
  for (datum in data) {
    datum.revenue = +datum.revenue
  }

  var monthArray = data.map(function (data){
    return data.month
  })

  var x = d3.scaleBand()
    .domain(monthArray)
    .range([0, width])
    .paddingInner(.3)
    .paddingOuter(.3)

  var maxRevenue = d3.max(data, function(datum) {
    return +datum.revenue
  })

  var y = d3.scaleLinear()
      .domain([0, maxRevenue + 5000])
      .range([height, 0])
      .nice()


  var xAxisCall = d3.axisBottom(x);

  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")" )
    .call(xAxisCall)
  .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")

  var yAxisCall = d3.axisLeft(y)
    .ticks(15)
    .tickFormat(function(d) {
      return "$" + d
    })
    .tickSize(10)

  g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall)

  var rects = g.selectAll("rect")
    .data(data)

  rects.enter().append("rect")
    .attr("x", function(d){
      return x(d.month)
    })
    .attr("y", function(d) { return y(d.revenue) })
    .attr("width", x.bandwidth)
    .attr("height", function(d){
      return height - y(d.revenue)
    })
    .attr("fill", 'gray')


})


