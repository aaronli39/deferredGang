var width = 600;
var height = 300;

var chart = d3.select(".chart0")
    .attr("width", width)
    .attr("height", height);

var chart1 = d3.select(".chart1")
    .attr("width", width)
    .attr("height", height);

var margin = {'top': 10, 'right': 15, 'bottom': 20, 'left': 15};

var selected_universities = ['Alabama A & M University', 'Princeton University', 'Harvey Mudd College'];

// tuition data
var tuition_data;
var tuition_link = "https://api.datausa.io/api/?sort=desc&show=university&required=oos_tuition%2Cstate_tuition&sumlevel=all&year=all";
d3.json(tuition_link).then(function(data) {
  tuition_data = data;
});

// acceptance data
var acceptance_data;
var acceptance_link = "https://api.datausa.io/api/?sort=desc&show=university&required=applicants_total%2Cadmissions_total&sumlevel=all&year=all";
d3.json(acceptance_link).then(function(data) {
  acceptance_data = data;
});

var update_universities = function(selection){
  /*
   * Updates the selected_universities array with the input.
   */
    if (selected_universities[3]){
    	selected_universities.pop();
    }
    selected_universities.push(selection);
};

var generate_graphs = function(selection, colleges){
  /*
   * Generates graphs.
   */
  d3.selectAll('g').remove();
  d3.selectAll('rect').remove();
  update_universities(selection);
  tuition_bar(colleges, tuition_data);
  acceptance_bar(colleges, acceptance_data);
};

var tuition_bar = function(colleges, data){
    /*
     * Provides a bar chart on data of the selected college in reference to other selected colleges.
     */
    var array = data['data'];
    var years = [2013, 2014, 2015, 2016];
    // will hold bar graph data
    var bar_data = [
      {'year': 2013, 'values': []},
      {'year': 2014, 'values': []},
      {'year': 2015, 'values': []},
      {'year': 2016, 'values': []},
    ];

    var tuition_list = []; //for collecting all tuition

    // Generates data in the form: {year: <y>, 0: <1st college tuition>, 1: <2nd college tuition>...}
    for (var index = 0; index < array.length; index++){
      // extract the appropriate entry
      var college = array[index];
      for (var uni_index = 0; uni_index < selected_universities.length; uni_index++){
        var university = selected_universities[uni_index];
        // check for each college
        if ( parseInt(colleges['names'][university]) == college[1]){
          // create an entry in the appropriate slot
          bar_data[college[0] - 2013]['values'].push( {
            'tuition': college[2],
            'name': university,
            'year': college[0]
          });
          tuition_list.push(college[2]);
        };
      };
    };

  //set domains
  var x = d3.scaleBand()
    .range([0, width])
    .domain([0, d3.max(years, function(d){return d.value;})]);

  var heightScale = d3.scaleLinear()
    .domain([0, d3.max(tuition_list)]) //d3.min(tuition_list)
    .range([height - margin.bottom * 2, margin.top]);

  var y = d3.scaleLinear()
    .domain([0, d3.max(tuition_list)]) //d3.min(tuition_list)
    .range([height - (margin.bottom * 2), margin.top * 1.2]);

  //split sections into equal lengths
  var bandScale = d3.scaleBand()
    .domain(years)
    .rangeRound([20, width - margin.right * 2])
    .padding(0.1);
  // console.log(bandScale(2013))

  //split bars in those sections into equal lengths
  var barScale = d3.scaleBand()
    .domain(selected_universities)
    .range([0, bandScale.bandwidth()])
    .padding(0.1);
  // console.log(barScale.bandwidth());

  var color = d3.scaleOrdinal()
    .domain(selected_universities)
    .range(["#C0C0C0", "#C0C0C0", "	#C0C0C0", "#6b486b"]);

  var x_axis = d3.axisBottom()
    .scale(bandScale); //this be a fxn

  var y_axis = d3.axisLeft()
    .scale(heightScale);

  // add x axis
  chart.append('g')
    .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
    .call(x_axis.tickSizeOuter(0))
    .call(g => g.select(".domain").remove())
    .append('text')
      .attr('x', width / 2)
      .attr('y', height)

  // add y axis
  chart.append('g')
    .attr('transform', 'translate(' + String(margin.left * 2.5) + ',' + margin.bottom + ')')
    .call(y_axis.tickSizeOuter(0))
    .call(g => g.select(".domain").remove());

  // add all bars
  chart.append('svg')
    .selectAll('g')
    .data(bar_data)
    .join('g')
      .attr('transform', function(d){
        // console.log(d, d[years[i]]);
        return 'translate(' + bandScale(d.year) + ', ' + (-1 * margin.bottom) + ')';
      })
    .selectAll('rect')
    .data(function(d){ return d.values; })
    .join('rect')
      .attr('class', function(d,i){ return 'bar' + String(i); })
      .attr('x', function(d){ return barScale(d.name); })
      .attr('y', function(d,i){
        return y(d.tuition); })
      .attr('tuition', function(d,i){ return d.tuition; })
      .attr('height', function(d,i) { return height - heightScale(d.tuition); })
      .attr('width', barScale.bandwidth())
      .attr('fill', function(d){ return color(d.name); })
      .on("mouseover", function(d) {
        // console.log(d);
        d3.select(this).style("fill", d3.rgb(color(d.name)).darker(2));
        hover(d);
      })
      .on("mouseout", function(d) {
        d3.select(this).style("fill", color(d.name));
        stop_hover(d);
      });

  var hover = function(d){
    // console.log(d);
    chart.append('text')
      .attr('x', barScale(d.name))
      .attr('y', y(d.tuition))
      .text(d.name + ': $' + d.tuition)
      .attr('id', 'popup')
      .attr('transform', 'translate(' + bandScale(d.year) * 1.25 + ',-2)')
    }
};

// ============================================================================================================================
// ============================================================================================================================


var acceptance_bar = function(colleges, data){
    /*
     * Provides a bar chart on data of the selected college in reference to other selected colleges.
     */
    var array = data['data'];
    var years = [2014, 2015, 2016];
    // will hold bar graph data
    var bar_data = [
      {'year': 2014, 'values': []},
      {'year': 2015, 'values': []},
      {'year': 2016, 'values': []},
    ];

    var percent_list = []; //for collecting all %

    // Generates data in the form: {year: <y>, 0: <1st college tuition>, 1: <2nd college tuition>...}
    for (var index = 0; index < array.length; index++){
      // extract the appropriate entry
      var college = array[index];
      for (var uni_index = 0; uni_index < selected_universities.length; uni_index++){
        var university = selected_universities[uni_index];
        // check for each college
        if ( parseInt(colleges['names'][university]) == college[1]){
          var rate = Math.round((college[3] / college[2]) * 100);
          // create an entry in the appropriate slot
          bar_data[college[0] - 2014]['values'].push( {
            'rate': rate,
            'name': university,
            'year': college[0]
          });
          percent_list.push(rate);
        };
      };
    };

  // console.log(bar_data);

  //set domains
  var x = d3.scaleLinear()
    .domain(years)
    .range([20, width - margin.right * 2]);

  var heightScale = d3.scaleLinear()
    .domain([0, d3.max(percent_list)]) //d3.min(tuition_list)
    .range([height - margin.bottom * 2, margin.top]);

  var y = d3.scaleLinear()
    .domain([0, d3.max(percent_list)]) //d3.min(tuition_list)
    .range([height - margin.bottom * 2, margin.top]);

  //split sections into equal lengths
  var bandScale = d3.scaleBand()
    .domain(years)
    .rangeRound([20, width - margin.right * 2])
    .padding(0.1);
  // console.log(bandScale(2013))

  //split bars in those sections into equal lengths
  var barScale = d3.scaleBand()
    .domain(selected_universities)
    .range([0, bandScale.bandwidth()])
    .padding(0.1);
  // console.log(barScale.bandwidth());

  var color = d3.scaleOrdinal()
    .domain(selected_universities)
    .range(["#C0C0C0", "#C0C0C0", "	#C0C0C0", "#6b486b"]);

  var x_axis = d3.axisBottom()
    .scale(bandScale); //this be a fxn

  var y_axis = d3.axisLeft()
    .scale(heightScale);

  // add x axis
  chart1.append('g')
    .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
    .call(x_axis.tickSizeOuter(0))
    .call(g => g.select(".domain").remove())
    .append('text')
      .attr('x', width / 2)
      .attr('y', height - margin.bottom)
      .text('Year');

  // add y axis
  chart1.append('g')
    .attr('transform', 'translate(' + String(margin.left * 2.5) + ',' + margin.bottom + ')')
    .call(y_axis.tickSizeOuter(0))
    .call(g => g.select(".domain").remove());


  // add all bars
  chart1.append('svg')
    .selectAll('g')
    .data(bar_data)
    .join('g')
      .attr('transform', function(d){
        // console.log(d, d[years[i]]);
        return 'translate(' + bandScale(d.year) + ', ' + (-1 * margin.bottom) + ')';
      })
    .selectAll('rect')
    .data(function(d){ return d.values; })
    .join('rect')
      .attr('class', function(d,i){ return 'bar' + String(i); })
      .attr('x', function(d){ return barScale(d.name); })
      .attr('y', function(d,i){
        return y(d.rate); })
      .attr('tuition', function(d,i){ return d.rate; })
      .attr('height', function(d,i) { return height - heightScale(d.rate); })
      .attr('width', barScale.bandwidth())
      .attr('fill', function(d){ return color(d.name); })
      .on("mouseover", function(d) {
        d3.select(this).style("fill", d3.rgb(color(d.name)).darker(2));
        hover(d);
      })
      .on("mouseout", function(d) {
        d3.select(this).style("fill", color(d.name));
        stop_hover(d);
      });

  var hover = function(d){
    // console.log(d);
    chart1.append('text')
      .attr('x', barScale(d.name))
      .attr('y', y(d.rate))
      .text(d.name + ': ' + d.rate + '%')
      .attr("dy", "0.35em")
      .attr('id', 'popup')
      .attr('transform', 'translate(' + bandScale(d.year) * 1.25 + ',-2)');
  }
};

var stop_hover = function(d){
  // console.log(d3.selectAll('#popup'));
  d3.selectAll('#popup').remove();
};
