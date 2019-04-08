// set the dimensions and margins of the graph
var width = 450
    height = 450
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I substract a bit of margin.
var radius = 200

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data = {jobs: 9, b: 20, c:30, d:8, e:12}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(d3.schemeSet2);

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))
// Now I know that group A goes from 0 degrees to x degrees and so on.

// shape helper to build arcs:
var arcGenerator = d3.arc()
  .innerRadius(100)
  .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
// Now add the annotation. Use the centroid method to get the best coordinates
svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data.key+"\n"+d.data.value+"%"})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)
  .append("text")

  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')

    .attr("transform", "translate(" + parseInt(outerRadius + 30, 10) + "," +
      parseInt(innerRadius + 30, 10) + ")")
    // Change text style on mouseover
    .attr('fill', function(d){ return color(d.name); })
    .on('mouseover', function(d) {
      d3.select(this).style("fill", d3.rgb(color(d.data.key)).darker(2));
      hover(d);
    })
    .on('mouseout', function(d) {
      d3.select(this).style("fill", color(d.data.key));
      stop_hover(d);
    })
    .style("font-size", 17)
    .append("text")
