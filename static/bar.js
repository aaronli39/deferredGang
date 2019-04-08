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
              uni_index:college[2],
              'name': university,
            });
            tuition_list.push(college[2]);
          };
        };
      };

    var years = [2013, 2014, 2015, 2016];
    console.log(bar_data);

    //set domains
    var x = d3.scaleLinear()
      .domain(years)
      .range([20, width - margin['right'] * 2]);

    var heightScale = d3.scaleLinear()
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
      .range(["#C0C0C0", "#C0C0C0", "	#C0C0C0", "#6b486b"])

    chart.append('svg')
      .selectAll('g')
      .data(bar_data)
      .join('g')
        .attr('transform', function(d,i){
          // console.log(d, d[years[i]]);
          return 'translate(' + bandScale(years[i]) + ',0)';
        })
      .selectAll('rect')
      .data(function(d){ return d.values; })
      .join('rect')
        .attr('class', function(d,i){ return 'bar' + String(i); })
        .attr('x', function(d){ return barScale(d['name']); })
        .attr('y', function(d,i){ return heightScale(d.uni_index); })
        .attr('tuition', function(d,i){ return d.uni_index; })
        .attr('height', function(d,i) { return height - heightScale(d.uni_index); })
        .attr('width', barScale.bandwidth())
        .attr('fill', function(d){ return color(d.name); });
  });
};
