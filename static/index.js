// Source: https://github.com/datasets/sea-level-rise
var data = [];

var width = 8400,
    height = 5100;


var chart = d3.select(".chart")
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
          // Get current event info
          // console.log(d3.event);
          //
          // // Get x & y co-ordinates
          // console.log(d3.mouse(this));
          hover(d);
        })
        .on('mouseout', stop_hover)
      .attr('class', 'node')
      .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
      })

    // node.append("title")
    //     .text(function(d) {
    //         return d.Name + ": " + d.Count;
    //     });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d,i) {
          // console.log(i, color(i));
          // console.log(numbers);
          return color(i);
        });

    // node.append("text")
    //     .attr("dy", ".2em")
    //     .style("text-anchor", "middle")
    //     .text(function(d) {
    //         return d.data.Name.substring(0, d.r / 3);
    //     })
    //     .attr("font-family", "sans-serif")
    //     .attr("font-size", function(d){
    //         return d.r/5;
    //     })
    //     .attr("fill", "white");

    // node.append("text")
    //     .attr("dy", "1.3em")
    //     .style("text-anchor", "middle")
    //     .text(function(d) {
    //         return d.data.Tuition;
    //     })
    //     .attr("font-family",  "Gill Sans", "Gill Sans MT")
    //     .attr("font-size", function(d){
    //         return d.r/5;
    //     })
    //     .attr("fill", "white");

        d3.select(self.frameElement)
            .style("height", (diameter / 2) + "px");

  });
});

var hover = function(d){
  // console.log(d);
  chart.append('text')
    .attr('x', d.x)
    .attr('y', d.y)
    .text(d.data.Name + ': $' + d.data.Tuition)
    .attr('id', 'popup');
    // .attr('transform', function(d){
    //   return 'translate(' + x + ',' + y + ')';
    // });
  // console.log(chart.selectAll('popup'));
}

var stop_hover = function(d){
  // console.log(d3.selectAll('#popup'));
  d3.selectAll('#popup').remove();
};

///---///

var submitB = document.getElementById("submit");
submitB.addEventListener('click', function(){
    var input = document.getElementById("search_button").value;
    console.log(input);
});

function suggest(){
    //Variables
    var input, filter, i;
    input = document.getElementById('search_button');
    filter = input.value.toUpperCase();
    //get list of college names
    d3.json('https://raw.githubusercontent.com/aaronli39/deferredGang/master/data/colleges.json').then(function(colleges){
	ctr = 0;
	var college_names = colleges['college_names'];
	//remove any existing list items
	d3.select("#suggestions").selectAll("li").remove();
	//add appropriate list items
	for (i = 0; i < college_names.length/4; i ++){
	    if(college_names[i].toUpperCase().indexOf(filter) > -1){
		d3.select("#suggestions").insert("li").text(college_names[i]);
		ctr ++;
	    }
	    if(ctr == 5){
		break;
	    }
	}
	/*
	var clist = document.getElementsByTagName("li");
	console.log(clist);
	for(i = 3; i < clist.length; i ++){
	    console.log(clist[i]);
	    clist[i].addEventListener('click', function(){
		input.innerHTML = this.innerHTML;
	    });
	}
	*/
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
