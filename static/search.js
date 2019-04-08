var collegeName, collegeId, colleges;

d3.json('https://raw.githubusercontent.com/aaronli39/deferredGang/master/data/colleges.json').then(function(data){
  colleges = data;
});

var submitB = document.getElementById("submit");
console.log(submitB);
submitB.addEventListener('click', function(){
    var input = document.getElementById("search_button").value;
    var filter = input.toUpperCase();
    //remove all list items
    d3.select("#suggestions").selectAll("li").remove();
	var college_names = colleges['college_names'];
	var college_ids = colleges['names'];
	var here = false;
	//search for the college name
	for (i = 0; i < college_names.length; i ++){
	    //if it exists change var false to true
	    if(college_names[i].toUpperCase() == filter){
		here = true;
		collegeName = college_names[i];
		collegeId = college_ids[collegeName];
		console.log(collegeId);
		generate_graphs(collegeName, colleges);
	    }
	}
	//Print message if college doesn't exist
	if (!here){
	    d3.select("#suggestions").insert("li").text(input + " doesn't exist");
	}
});

function suggest(){
    //Variables
    var input, filter, i;
    input = document.getElementById('search_button');
    filter = input.value.toUpperCase();
    //get list of college names
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
	for(i = 2; i < clist.length; i ++){
	    clist[i].addEventListener('click', function(){
		console.log(this);
		input.value = this.innerText;
	    });
	}
};
