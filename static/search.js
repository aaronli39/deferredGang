function get_tuition(id){
    d3.json("https://api.datausa.io/api/?sort=desc&show=university&required=oos_tuition%2Cstate_tuition&sumlevel=all&year=all").then(function(data){
	var tuition_array = data['data'];
	for(i = 0; i < tuition_array.length; i ++){
	    if(tuition_array[i][0] == '2016' &&
	       tuition_array[i][1] == id){
		console.log(tuition_array[i][2]);
		//INSERT FUNCTION
	    }
	}
    });
};

function get_accept(id){
    d3.json("https://api.datausa.io/api/?sort=desc&show=university&required=applicants_total%2Cadmissions_total&sumlevel=all&year=all").then(function(data){
	var accept_array = data['data'];
	for(i = 0; i < accept_array.length; i ++){
	    if(accept_array[i][0] == '2016' &&
	       accept_array[i][1] == id){
		console.log(100*accept_array[i][3]/accept_array[i][2]);
		//INSERT FUNCTION
	    }
	}
    });
};


var submitB = document.getElementById("submit");
console.log(submitB);
submitB.addEventListener('click', function(){
    var input = document.getElementById("search_button").value;
    var filter = input.toUpperCase();
    //remove all list items
    d3.select("#suggestions").selectAll("li").remove();
    d3.json('https://raw.githubusercontent.com/aaronli39/deferredGang/master/data/colleges.json').then(function(colleges){
	var college_names = colleges['college_names'];
	var here = false;
	//search for the college name
	for (i = 0; i < college_names.length; i ++){
	    //if it exists change var false to true
	    if(college_names[i].toUpperCase() == filter){
		here = true;
		var collegeName = college_names[i];
		var collegeId = colleges['names'][collegeName]
		get_tuition(collegeId);
		get_accept(collegeId);
	    }
	}
	//Print message if college doesn't exist
	if (!here){
	    d3.select("#suggestions").insert("li").text(input + " doesn't exist");
	}
    });    
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
	for (i = 0; i < college_names.length; i ++){
	    if(college_names[i].toUpperCase().indexOf(filter) > -1){
		d3.select("#suggestions").insert("li").text(college_names[i]);
		ctr ++;
	    }
	    //cut off at 5 list items
	    if(ctr == 5){
		break;
	    }
	}
	//when user clicks a list item, change the search field to that item
	var clist = document.getElementsByTagName("li");
	for(i = 3; i < clist.length; i ++){
	    clist[i].addEventListener('click', function(){
		console.log(this);
		input.value = this.innerText;
	    });
	}
    });    
};
