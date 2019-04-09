function get_majors(collegeId) {
    var apistub = 'https://api.datausa.io/api/?sort=desc&sumlevel=6&degree=5&show=cip&year=2016&university=';
    apistub = apistub + collegeId;
    apistub = apistub + '&required=grads_total&where=grads_total%3A!0';
    d3.json(apistub).then(function (data) {
        majors = data['data'];
    });
    var total = 0;
    var list_majors = [];
    for (i = 0; i < majors.length; i++) {
            total += majors[i][4];
    }
    for (i = 0; i < majors.length; i++) {
        if (majors[i][4] / total > 0.1) {
            list_majors.push(majors[i][2]);
            list_majors.push(majors[i][4] / total);
        }
    }
    return list_majors;
}
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
var data = get_majors(collegeId)

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
    .on('mouseover', function(d) {
      d3.select(this).style("fill", d3.rgb(color(d.data.key)).brighter(1));
      hover(d);
    })
    .on('mouseout', function(d) {
      d3.select(this).style("fill", d3.rgb(color(d.data.key)));
      stop_hover(d);
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
// Now add the annotation. Use the centroid method to get the best coordinates
svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data.key+": \n"+d.data.value+"%"})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)
  .on('mouseover', function(d) {
    d3.select(this).style("fill", d3.rgb(color(black)));
    hover(d);
  })
  .on('mouseout', function(d) {
    d3.select(this).style("fill", d3.rgb(color(black)));
    stop_hover(d);


  svg
    .selectAll('mySlices')
    .data(data_ready)
    .enter()

    .attr("transform", "translate(" + parseInt(outerRadius + 30/ 10) + "," +
      parseInt(innerRadius + 30, 10) + ")")
    // Change text style on mouseover

    })
    .style("font-size", 17)
    .append("text")

var hover = function(d){
  // console.log(d);
  pie.append('text')
    .text(d.data.key + ': ' + d.data.value + '%')
    .attr('id', 'popup')
    .attr('transform', 'translate(' + bandScale(d.data.value) * 1.25 + ',-2)');
}

var stop_hover = function(d){
  // console.log(d3.selectAll('#popup'));
  d3.selectAll('#popup').remove();
};
