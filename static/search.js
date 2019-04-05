
var submitB = document.getElementById("submit");
submitB.addEventListener('click', function(){
    console.log("clicked");
    var input = document.getElementById("search_button").value;
    console.log(input);
    d3.json('https://raw.githubusercontent.com/aaronli39/deferredGang/master/data/colleges.json').then(function(colleges){
	var college_names = colleges['college_names'];
	var here = false;
	//add appropriate list items
	console.log(here);
	for (i = 0; i < college_names.length; i ++){
	    if(college_names[i].toUpperCase() == filter){
		here = true;
	    }
	}
	console.log(here);
	if (!here){
	    d3.select("#suggestions").insert("li").text("DOESN'T EXIST");
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
}
