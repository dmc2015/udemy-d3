/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/


// var margin = { left: 100, top: 10, bottom: 150, right: 10}

// var height = 600 - margin.bottom - margin.top,
//     width = 600 - margin.right - margin.left

//their
    var margin = { left:80, right:20, top:50, bottom:100 };

    var width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

let flag = true
var t = d3.transition().duration(500)

var g = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var xAxisGroup = g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0, " + height + ")" )

var yAxisGroup = g.append("g")
  .attr("class", "y axis")

var y = d3.scaleLinear()
  .range([height, 0])
  .nice()

var x = d3.scaleBand()
  .range([0, width])
  .paddingInner(.3)
  .paddingOuter(.3)

g.append("text")
  .attr("class", "x axis-label")
  .attr("x", width / 2)
  .attr("y", height + 75)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Months")

const yLabel = g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (height / 2))
  .attr("y", -60 )
  .attr("text-anchor", "middle")
  .attr("font-size", "20px")
  .attr("transform", "rotate(-90)")

d3.json("./data/revenues.json").then( function(data) {

  for (index in data) {
    data[index].revenue = +data[index].revenue
    data[index].profit = +data[index].profit
  }

  d3.interval(function(){
    var newData = flag ? data : data.slice(1);

    update(newData)
    flag = !flag
  }, 1000);

  update(data)
})


function update(data) {

  var monthArray = data.map(function (data){
    return data.month
  })

  var maxRevenue = d3.max(data, function(datum) {
    return +datum.revenue
  })


  const yDataType = flag ? 'profit' : 'revenue'
  yLabel.text( flag ? "Profit ($)" : "Revenue ($)")

  x.domain(monthArray)
  y.domain([0, d3.max(data, function(d) { return d[yDataType] + 10000}) ])

  var xAxisCall = d3.axisBottom(x);

  // Because we don't want to recreate the group on an interval
  // We move that part out of the update and reference its variable
  xAxisGroup
    .transition(t)
    .call(xAxisCall)
    .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-40)")

  var yAxisCall = d3.axisLeft(y)
    // .ticks(15)
    .tickFormat(function(d) {
      return "$" + d
    })
    .tickSize(10)


  // Because we don't want to recreate the group on an interval
  // We move that part out of the update and reference its variable
  yAxisGroup.transition(t)
    .call(yAxisCall)

  // Join new data to old elements
  var rects = g.selectAll("rect")
    .data(data, function(d) {
      return d.month
    })

  // exit old elements not present in new data

  rects.exit()
    .attr('fill', 'red')
  .transition(t)
    .attr('height', 0)
    .attr('y', y(0))
    .remove()


  // update old elements present on page
  // rects.transition(t)
  //   .attr("x", function(d){
  //       return x(d.month)
  //   })
  //   .attr("y", function(d) { return y(d[yDataType]) })
  //   .attr("width", x.bandwidth)
  //   .attr("height", function(d){
  //     return height - y(d[yDataType])
  //   })

  // // enter new elements present in new data
  // rects.enter().append("rect")
  //   .attr("x", function(d){
  //     return x(d.month)
  //   })
  //   .attr("width", x.bandwidth)
  //   .attr("fill", 'gray')
  //   .attr("y", y(0))
  //   .attr('height', 0)
  //   .transition(t)
  //     .attr("y", function(d) { return y(d[yDataType]) })
  //     .attr("height", function(d){
  //       return height - y(d[yDataType])
  //     })

  // create and update
  rects.enter()
      .append("rect")
        .attr("fill", "grey")
        .attr("y", y(0))
        .attr("height", 0)
        .attr("x", function(d) { return x(d.month) })
        .attr("width", x.bandwidth)
        .merge(rects)
        .transition(t)
          .attr("x", function(d) { return x(d.month) })
          .attr("width", x.bandwidth)
          .attr("y", function(d) { return y(d[yDataType]) })
          .attr("height", function(d) { return height - y(d[yDataType]) })


}

