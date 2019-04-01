
// Source: https://github.com/datasets/sea-level-rise
var data = [];

d3.json('https://raw.githubusercontent.com/aaronli39/deferredGang/master/data/colleges.json').then(function(data){
  console.log(data);
});

var years = [1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014];
var values = [6.297493046, 6.310933553, 6.452568661, 6.62763131, 6.733920367, 6.865806069, 6.848689771, 6.920582014, 7.087460011,
          7.319697525, 7.488352718, 7.507932839, 7.644563144, 7.697420009, 7.70214715, 7.90736541, 8.04635409, 8.122972567,
          8.053065004, 8.457057629, 8.546648227, 8.663700393];

for (var index = 0; index < years.length; index++){
  data[index] = [years[index], values[index]];
};

// d3.json("https://api.datausa.io/api/?sort=desc&show=university&required=oos_tuition%2Cstate_tuition&sumlevel=all&year=all").then(function(data) {
//   console.log(data['data']['']);
// });

var width = 840,
    height = 300;

var x = d3.scaleLinear()
    .domain([d3.min(years) - 1, d3.max(years) + 1])
    .range([20, width - 40]);

var y = d3.scaleLinear()
    .domain([d3.min(values) - 1, d3.max(values) + 1])
    .range([0, height]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

var plot = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d) {
      return 'translate(' + x(d[0]) + ',' + (height - y(d[1])) + ')';
     })

plot.append('rect')
  .attr('width', 4)
  .attr('height', 4);

var x_scale = d3.scaleLinear()
  .domain([d3.min(years), d3.max(years)])
  .range([20,width-40]);

var y_scale = d3.scaleLinear()
  .domain([d3.min(values), d3.max(values)])
  .range([height, 0]);

var x_axis = d3.axisBottom()
  .scale(x_scale); //this be a fxn
  // .orient('left');

var y_axis = d3.axisLeft()
  .scale(y_scale);

chart.append('g')
  .attr('transform', 'translate(30, ' + (height - 25) +  ')')
  .call(x_axis);

chart.append('g')
  .attr('transform', 'translate(50,0)')
  .call(y_axis);

// x-axis label
chart.append('text')
  .attr('x', width / 2)
  .attr('y', height)
  .text('Year');

// y-axis label
chart.append('text')
  .attr('transform', 'rotate(-90)') //causes all coordinates to be negated
  .attr('x', 0 - (height / 2))
  .attr('y', 0)
  .attr('dy', '1em')
  .style('text-anchor', 'middle')
  .text('NOAA - Adjusted sea level (inches)');

// title
chart.append('text')
  .attr('x', width / 2 + 60)
  .attr('y', 10)
  .text('Figure 1. Global Average Sea Levels, 1993-2014')
