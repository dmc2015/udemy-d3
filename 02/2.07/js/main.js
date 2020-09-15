/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.7 - Loading external data
*/

d3.tsv("data/ages.tsv").then(function(data, i) {
  // console.log(data)
  data.forEach(function(d, i, ) {
    d.age = +d.age
  })

  // data.forEach(function(d){
    //         d.age = +d.age;
    //     });

  // for ( i in data) {
  //   console.log(data[i])
  // }

  // console.log(JSON.stringify(data))

  var svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 400)

  var circle = svg.selectAll("circle")
    .data(data)

  circle.enter()
    .append("circle")
    .attr("cx", function(d, i){
      return i * 70 + 20
    })
    .attr("cy", function(d, i){
      return i + 50
    })
    .attr("r", function(d, i) {
      return d.age * 2
    })
    .attr("fill", function(d, i){
      return (d.age * 4) % 5 == 0 ? "green" : "turquoise"
    })
})




























// d3.tsv("data/ages.tsv").then(function(data){
//     data.forEach(function(d){
//         d.age = +d.age;
//     });

//     var svg = d3.select("#chart-area").append("svg")
//         .attr("width", 400)
//         .attr("height", 400);

//     var circles = svg.selectAll("circle")
//         .data(data);

//     circles.enter()
//         .append("circle")
//             .attr("cx", function(d, i){
//                 console.log(d);
//                 return (i * 50) + 25;
//             })
//             .attr("cy", 25)
//             .attr("r", function(d){
//                 return d.age * 2;
//             })
//             .attr("fill", function(d){
//                 if (d.name == "Tony") {
//                     return "blue";
//                 }
//                 else {
//                     return "red";
//                 }
//             });
// }).catch(function(error){
//     console.log(error);
// })
