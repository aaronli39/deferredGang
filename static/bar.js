var width = 500;
var height = 300;
var years = [2013, 2014, 2015, 2016];

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
    var x = d3.scaleLinear()
      .domain(years)
      .range([20, width - margin['right'] * 2]);

    var heightScale = d3.scaleLinear()
      .domain([0, d3.max(tuition_list)]) //d3.min(tuition_list)
      .range([height - margin['bottom'] * 2, margin['top']]);

    var y = d3.scaleLinear()
      .domain([0, d3.max(tuition_list)]) //d3.min(tuition_list)
      .range([height - margin['bottom'] * 2, margin['top']]);


    //split sections into equal lengths
    var bandScale = d3.scaleBand()
      .domain(years)
      .rangeRound([20, width - margin['right'] * 2])
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
      .scale(x); //this be a fxn

    var y_axis = d3.axisLeft()
      .scale(heightScale);

    // add x axis
    chart.append('g')
      .attr('x', width / 2)
      .attr('y', height - margin['bottom'])
      .call(x_axis)
      .append('text')
        .attr('x', width / 2)
        .attr('y', height - margin['bottom'])
        .text('Year');

    // add y axis
    chart.append('g')
      .attr('transform', 'translate(' + String(margin['left'] * 3.5) + ',' + String(margin['bottom'] * 1.5) + ')')
      .call(y_axis);


    // add all bars
    chart.append('svg')
      .selectAll('g')
      .data(bar_data)
      .join('g')
        .attr('transform', function(d){
          // console.log(d, d[years[i]]);
          return 'translate(' + bandScale(d.year) + ',0)';
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
          console.log(d);
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
  });
};


var stop_hover = function(d){
  // console.log(d3.selectAll('#popup'));
  d3.selectAll('#popup').remove();
};
