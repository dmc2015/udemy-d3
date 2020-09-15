/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.9 - Margins and groups
*/





// var margin = { top:10, right: 10, bottom: 150, left:100 }

// var width = 600 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // var g = d3.select("body").append("svg")
// //   .attr("width", width + margin.left + margin.right)
// //   .attr("height", height + margin.top + margin.bottom)
// //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
// //   .append('g');


// var svg = d3.select("#chart-area")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right )
//   .attr("height", height + margin.top + margin.bottom )

// var g = svg.append('g')
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")



var margin = { left:100, right:10, top:10, bottom:150 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left
            + ", " + margin.top + ")");


// X Label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", width / 2)
  .attr("y", height + 140)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Worlds Tallest Buildings")

// Y Label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (height / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Height (m)")

d3.json("data/buildings.json").then(function(data) {

  data.forEach(function(d){
    d.height = +d.height;
});

var x = d3.scaleBand()
    .domain(data.map(function(d){ return d.name; }))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){
            return d.height;
        })])
        .range([0, height]);

    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall)
    .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

    var yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(function(d){
            return d + "m";
        });
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);

    var rects = g.selectAll("rect")
        .data(data)

    rects.enter()
        .append("rect")
            .attr("y", 0)
            .attr("x", function(d){ return x(d.name); })
            .attr("width", x.bandwidth)
            .attr("height", function(d){ return y(d.height); })
            .attr("fill", "grey");




  // var y = d3.scaleLinear()
  //   .domain([0, d3.max(data, function(d) { return d.height } )])
  //   .range([0, height])

  // var xAxisCall = d3.axisBottom(x);

  // g.append('g')
  // .attr("class", "x axis")
  // .attr("transform", "translate(0, " + height + ")")
  // .call(xAxisCall)
  // .selectAll("text")
  // .attr('y', '10')
  // .attr('x', '-5')
  // .attr('text-anchor', 'end')
  // .attr('transform', 'rotate(-40)')

  // var yAxisCall = d3.axisLeft(y)
  //   .ticks(3)
  //   .tickFormat(function(d) {
  //     return d + 'm'
  //   })

  // g.append('g')
  //   .attr("class", "y-axis")
  //   // .attr("transform", "translate(0, " + width + ")")
  //   .call(yAxisCall)

  //   var rects = g.selectAll("rect")
  //   .data(data)

  // rects.enter()
  //   .append("rect")
  //   .attr("y", 0)
  //   .attr("x", function(d) {
  //     return x(d.name)
  //   })
  //   .attr("width", x.bandwidth)
  //   .attr("height", function(d) {
  //     return y(d.height)
  //   })
  //   .attr("fill", "gray")



}).catch(function (err) {
  console.log(err)
})

















// var margin = { left:100, right:10, top:10, bottom:100 };

// var width = 600 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// var g = d3.select("#chart-area")
//     .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//         .attr("transform", "translate(" + margin.left
//             + ", " + margin.top + ")")

// d3.json("data/buildings.json").then(function(data){
//     // console.log(data);

//     data.forEach(function(d) {
//         d.height = +d.height;
//     });

//     var x = d3.scaleBand()
//         .domain(data.map(function(d){
//             return d.name;
//         }))
//         .range([0, width])
//         .paddingInner(0.3)
//         .paddingOuter(0.3);

//     var y = d3.scaleLinear()
//         .domain([0, d3.max(data, function(d){
//             return d.height;
//         })])
//         .range([0, height]);

//     var rects = g.selectAll("rect")
//         .data(data)

//     rects.enter()
//         .append("rect")
//             .attr("y", 0)
//             .attr("x", function(d){ return x(d.name); })
//             .attr("width", x.bandwidth)
//             .attr("height", function(d){ return y(d.height); })
//             .attr("fill", "grey");

// })
