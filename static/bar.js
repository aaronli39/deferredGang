var width = 500;
var height = 300;

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

var margin = {'top': 10, 'right': 10, 'bottom': 10, 'left': 10};

var selected_universities = ['Alabama A & M University', 'Princeton University', 'Harvey Mudd College'];
selected_universities.push('Harvard University');


d3.json('https://raw.githubusercontent.com/aaronli39/deferredGang/master/data/colleges.json').then(function(colleges){
  tuition_bar(colleges);
});

var tuition_bar = function(colleges){
    /*
     * Provides a bar chart on data of the selected college in reference to other selected colleges.
     */
    var url_choice = "https://api.datausa.io/api/?sort=desc&show=university&required=oos_tuition%2Cstate_tuition&sumlevel=all&year=all";
    d3.json(url_choice).then(function(data) {
      var array = data['data'];
      // will hold bar graph data
      var bar_data = [{},{},{},{}];

      // toss in each unviersity into its own directory
      for (var uni_index = 0; uni_index < selected_universities.length; uni_index++){
        bar_data[uni_index]['name'] = selected_universities[uni_index];
      };

      var tuition_list = []; //for collecting all tuition

      for (var index = 0; index < array.length; index++){
        // extract the appropriate entry
        var college = array[index];
        selected_universities.forEach(function(university){
          // check for each college
          if ( parseInt(colleges['names'][university]) == college[1]){
            // create an entry in the appropriate slot
            // bar_data[college[0] - 2013][college[0]] = college[2];
            for (var data_index = 0; data_index < bar_data.length; data_index++){
              if (bar_data[data_index]['name'] == university){
                bar_data[data_index][college[0]] = college[2];
              };
            };
            tuition_list.push(college[2]);
          };
        });
      };

    // console.log(bar_data);
    //set domains
    var x = d3.scaleLinear()
      .domain([2013,2016])
      .range([20, width - margin['right'] * 2]);

    var y = d3.scaleLinear()
      .domain([0, d3.max(tuition_list)]) //d3.min(tuition_list)
      .range([0, height - margin['top'] * 2]);

    var bars = chart.selectAll('g')
      .data(bar_data)
      .enter();

    //split bars into equal lengths
    var bandScale = d3.scaleBand()
      .domain()
      .padding(0.1)


    var color = d3.scaleOrdinal()
      .domain(selected_universities)
      .range(["#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    //apply rects using a loop
    var years = [2013, 2014, 2015, 2016];
    for(var index = 0; index < years.length; index++){
      bars.append('rect')
        .attr('class', 'bar' + String(index))
        .attr('x', x(years[index]))
        .attr('year', years[index])
        .attr('y', function(d){
          //input tuition data for that year
          // console.log(d[years[index]])
          return y(d[years[index]]);
        })
        .attr('height', function(d) {
          return y(d[years[index]]);
        })
        .attr('width', 20)
        .attr('fill', function(d){
          return color(d['name']);
        });

        // bars.append('rect')
        //   .attr('class', 'bar' + String(index))
        //   .attr('x', x(years[index]))
        //   .attr('year', years[index])
        //   .attr('y', function(d){
        //     //input tuition data for that year
        //     // console.log(d[years[index]])
        //     return y(d[years[index]]);
        //   })
        //   .attr('height', function(d) {
        //     return y(d[years[index]]);
        //   })
        //   .attr('width', 20)
        //   .attr('fill', function(d){
        //     return color(d['name']);
        //   });

    };
  });
};

// var years = [1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014];
// var values = [6.297493046, 6.310933553, 6.452568661, 6.62763131, 6.733920367, 6.865806069, 6.848689771, 6.920582014, 7.087460011,
//           7.319697525, 7.488352718, 7.507932839, 7.644563144, 7.697420009, 7.70214715, 7.90736541, 8.04635409, 8.122972567,
//           8.053065004, 8.457057629, 8.546648227, 8.663700393];
//
// for (var index = 0; index < years.length; index++){
//   data[index] = [years[index], values[index]];
// };
//
//
//
// var x = d3.scaleLinear()
//     .domain([d3.min(years) - 1, d3.max(years) + 1])
//     .range([20, width - 40]);
//
// var y = d3.scaleLinear()
//     .domain([d3.min(values) - 1, d3.max(values) + 1])
//     .range([0, height]);
//
// var chart = d3.select(".chart")
//     .attr("width", width)
//     .attr("height", height);
//
// var plot = chart.selectAll("g")
//     .data(data)
//   .enter().append("g")
//     .attr("transform", function(d) {
//       return 'translate(' + x(d[0]) + ',' + (height - y(d[1])) + ')';
//      })
//
// plot.append('rect')
//   .attr('width', 4)
//   .attr('height', 4);
//
// var x_scale = d3.scaleLinear()
//   .domain([d3.min(years), d3.max(years)])
//   .range([20,width-40]);
//
// var y_scale = d3.scaleLinear()
//   .domain([d3.min(values), d3.max(values)])
//   .range([height, 0]);
//
// var x_axis = d3.axisBottom()
//   .scale(x_scale); //this be a fxn
//   // .orient('left');
//
// var y_axis = d3.axisLeft()
//   .scale(y_scale);
//
// chart.append('g')
//   .attr('transform', 'translate(30, ' + (height - 25) +  ')')
//   .call(x_axis);
//
// chart.append('g')
//   .attr('transform', 'translate(50,0)')
//   .call(y_axis);
//
// // x-axis label
// chart.append('text')
//   .attr('x', width / 2)
//   .attr('y', height)
//   .text('Year');
//
// // y-axis label
// chart.append('text')
//   .attr('transform', 'rotate(-90)') //causes all coordinates to be negated
//   .attr('x', 0 - (height / 2))
//   .attr('y', 0)
//   .attr('dy', '1em')
//   .style('text-anchor', 'middle')
//   .text('NOAA - Adjusted sea level (inches)');
//
// // title
// chart.append('text')
//   .attr('x', width / 2 + 60)
//   .attr('y', 10)
//   .text('Figure 1. Global Average Sea Levels, 1993-2014')
