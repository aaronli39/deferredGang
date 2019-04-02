
// Source: https://github.com/datasets/sea-level-rise
var data = [];

var width = 8400,
    height = 7000;


var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

d3.json('https://raw.githubusercontent.com/aaronli39/deferredGang/master/data/colleges.json').then(function(colleges){
  // bubble graph
  d3.json("https://api.datausa.io/api/?sort=desc&show=university&required=oos_tuition%2Cstate_tuition&sumlevel=all&year=all").then(function(data) {
    var tuition_array = data['data'];
    var college_names = [];
    var tuition = [];
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
        };
        // college_names.push(colleges['id'][String(college[1])]);
        // tuition.push(college[2]);
        // console.log(college[2]);
      };
    };
    var color = d3.scaleOrdinal(d3['schemeAccent']);
    console.log(dataset);

    var diameter = 6000;
    var color = d3.scaleOrdinal();
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
      .attr('class', 'node')
      .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("title")
        .text(function(d) {
            return d.Name + ": " + d.Count;
        });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d,i) {
            return color(i);
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Tuition;
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");

        d3.select(self.frameElement)
            .style("height", diameter + "px");

  });
});


///---///
//PieChart
var pie = new d3pie("pieChart", {
	"header": {
		"title": {
			"text": "Lots of Programming Languages",
			"fontSize": 24,
			"font": "open sans"
		},
		"subtitle": {
			"text": "A full pie chart to show off label collision detection and resolution.",
			"color": "#999999",
			"fontSize": 12,
			"font": "open sans"
		},
		"titleSubtitlePadding": 9
	},
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "open sans",
		"location": "bottom-left"
	},
	"size": {
		"canvasWidth": 590,
		"pieOuterRadius": "90%"
	},
	"data": {
		"sortOrder": "value-desc",
		"content": [
			{
				"label": "JavaScript",
				"value": 264131,
				"color": "#2484c1"
			},
			{
				"label": "Ruby",
				"value": 218812,
				"color": "#0c6197"
			},
			{
				"label": "Java",
				"value": 157618,
				"color": "#4daa4b"
			},
			{
				"label": "PHP",
				"value": 114384,
				"color": "#90c469"
			},
			{
				"label": "Python",
				"value": 95002,
				"color": "#daca61"
			},
			{
				"label": "C+",
				"value": 78327,
				"color": "#e4a14b"
			},
			{
				"label": "C",
				"value": 67706,
				"color": "#e98125"
			},
			{
				"label": "Objective-C",
				"value": 36344,
				"color": "#cb2121"
			},
			{
				"label": "Shell",
				"value": 28561,
				"color": "#830909"
			},
			{
				"label": "Cobol",
				"value": 24131,
				"color": "#923e99"
			},
			{
				"label": "C#",
				"value": 100,
				"color": "#ae83d5"
			},
			{
				"label": "Coldfusion",
				"value": 68,
				"color": "#bf273e"
			},
			{
				"label": "Fortran",
				"value": 218812,
				"color": "#ce2aeb"
			},
			{
				"label": "Coffeescript",
				"value": 157618,
				"color": "#bca44a"
			},
			{
				"label": "Node",
				"value": 114384,
				"color": "#618d1b"
			},
			{
				"label": "Basic",
				"value": 95002,
				"color": "#1ee67b"
			},
			{
				"label": "Cola",
				"value": 36344,
				"color": "#b0ec44"
			},
			{
				"label": "Perl",
				"value": 32170,
				"color": "#a4a0c9"
			},
			{
				"label": "Dart",
				"value": 28561,
				"color": "#322849"
			},
			{
				"label": "Go",
				"value": 264131,
				"color": "#86f71a"
			},
			{
				"label": "Groovy",
				"value": 218812,
				"color": "#d1c87f"
			},
			{
				"label": "Processing",
				"value": 157618,
				"color": "#7d9058"
			},
			{
				"label": "Smalltalk",
				"value": 114384,
				"color": "#44b9b0"
			},
			{
				"label": "Scala",
				"value": 95002,
				"color": "#7c37c0"
			},
			{
				"label": "Visual Basic",
				"value": 78327,
				"color": "#cc9fb1"
			},
			{
				"label": "Scheme",
				"value": 67706,
				"color": "#e65414"
			},
			{
				"label": "Rust",
				"value": 36344,
				"color": "#8b6834"
			},
			{
				"label": "FoxPro",
				"value": 32170,
				"color": "#248838"
			}
		]
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
			"hideWhenLessThanPercentage": 3
		},
		"mainLabel": {
			"fontSize": 11
		},
		"percentage": {
			"color": "#ffffff",
			"decimalPlaces": 0
		},
		"value": {
			"color": "#adadad",
			"fontSize": 11
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"gradient": {
			"enabled": true,
			"percentage": 100
		}
	}
});


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
