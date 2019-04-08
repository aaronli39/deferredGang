// Source: https://github.com/datasets/sea-level-rise
var data = [];

var width = 8400,
    height = 5100;


var chart = d3.select(".chart4")
    .attr("width", width)
    .attr("height", height);

var chart1 = d3.select(".chart5")
    .attr("width", width)
    .attr("height", height);

d3.json('https://raw.githubusercontent.com/aaronli39/deferredGang/master/data/colleges.json').then(function(colleges){
  // bubble graph
  d3.json("https://api.datausa.io/api/?sort=desc&show=university&required=oos_tuition%2Cstate_tuition&sumlevel=all&year=all").then(function(data) {
    var tuition_array = data['data'];
    var numbers = [];
    // var tuition = [];
    var dataset = {
      'children':[]
    };
    // var college_name = colleges['id']['100654'];
    // console.log(data);
    for (var index = 0; index < tuition_array.length; index++){
      var college = tuition_array[index];
      if (college[0] == '2016'){
        if (!isNaN(college[1])){
          dataset.children.push( {'Name': colleges['id'][String(college[1])], 'Tuition': college[2]} );
          // tuition.push(college[2]);
        };
        // college_names.push(colleges['id'][String(college[1])]);
        // console.log(college[2]);
      };
    };

    for (var i = 0; i < dataset.children.length; i++){
      numbers.push(i);
    }

    var color = d3.scaleOrdinal(d3['schemeAccent'])
      .domain(numbers)
      .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);

    console.log(dataset);

    var diameter = 6000;

    // console.log(color(1));

    var bubble = d3.pack(dataset)
      .size([diameter, diameter])
      .padding(1.5);

    chart.append('svg')
      .attr('width', diameter)
      .attr('height', diameter)
      .attr('class', 'bubble');

    var nodes = d3.hierarchy(dataset)
      .sum(function(d) {
        if (d.Tuition){
          // console.log(d.Tuition);
          return d.Tuition;
        };
      });

    // console.log(bubble(nodes));

    var node = chart.selectAll('.node')
      .data(bubble(nodes).descendants()) //node.bubble is an undefined method
      .enter()
      .filter(function(d){
          return  !d.children
      })
      .append('g')
        .on('mouseover', function(d){
          hover(d);
        })
        .on('mouseout', stop_hover)
      .attr('class', 'node')
      .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
      })

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d,i) {
          // console.log(i, color(i));
          // console.log(numbers);
          return color(i);
        });

    d3.select(self.frameElement)
        .style("height", (diameter / 2) + "px");

    var hover = function(d){
      chart.append('text')
        .attr('x', d.x)
        .attr('y', d.y)
        .text(d.data.Name + ': $' + d.data.Tuition)
        .attr('id', 'popup');
    };
  });

  d3.json("https://api.datausa.io/api/?sort=desc&show=university&required=applicants_total%2Cadmissions_total&sumlevel=all&year=all").then(function(data) {
    var acceptance_array = data['data'];
    var numbers = [];
    // var tuition = [];
    var dataset = {
      'children':[]
    };
    // var college_name = colleges['id']['100654'];
    // console.log(data);
    for (var index = 0; index < acceptance_array.length; index++){
      var college = acceptance_array[index];
      if (college[0] == '2016'){
        if (!isNaN(college[1])){
          dataset.children.push( {'Name': colleges['id'][String(college[1])], 'Rate': Math.round((college[3] / college[2]) * 100)} );
        };
      };
    };

    for (var i = 0; i < dataset.children.length; i++){
      numbers.push(i);
    }

    var color = d3.scaleOrdinal(d3['schemeAccent'])
      .domain(numbers)
      .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);

    var diameter = 6000;

    // console.log(color(1));

    var bubble = d3.pack(dataset)
      .size([diameter, diameter])
      .padding(1.5);

    chart1.append('svg')
      .attr('width', diameter)
      .attr('height', diameter)
      .attr('class', 'bubble');

    var nodes = d3.hierarchy(dataset)
      .sum(function(d) {
        if (d.Rate){
          // console.log(d.Tuition);
          return d.Rate;
        };
      });

    // console.log(bubble(nodes));

    var node = chart1.selectAll('.node')
      .data(bubble(nodes).descendants()) //node.bubble is an undefined method
      .enter()
      .filter(function(d){
          return  !d.children
      })
      .append('g')
        .on('mouseover', function(d){
          hover(d);
        })
        .on('mouseout', stop_hover)
      .attr('class', 'node')
      .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
      })

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d,i) {
          // console.log(i, color(i));
          // console.log(numbers);
          return color(i);
        });

    d3.select(self.frameElement)
        .style("height", (diameter / 2) + "px");

    var hover = function(d){
      chart1.append('text')
        .attr('x', d.x)
        .attr('y', d.y)
        .text(d.data.Name + ': ' + d.data.Rate + '%')
        .attr('id', 'popup');
    };

  });
});

var stop_hover = function(d){
  // console.log(d3.selectAll('#popup'));
  d3.selectAll('#popup').remove();
};
