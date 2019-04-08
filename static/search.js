var collegeName, collegeId, colleges, majors;

d3.json('https://raw.githubusercontent.com/aaronli39/deferredGang/master/data/colleges.json').then(function (data) {
    colleges = data;
});

function get_majors() {
    var apistub = 'https://api.datausa.io/api/?sort=desc&sumlevel=6&degree=5&show=cip&year=all&university=';
    apistub = apistub + collegeId;
    apistub = apistub + '&required=grads_total&where=grads_total%3A!0';
    d3.json(apistub).then(function (data) {
        majors = data['data'];
    });
    var total = 0;
    var list_majors = [];
    for (i = 0; i < majors.length; i++) {
        if (majors[i][0] == '2016' && majors[i][3] == '5') {
            total += majors[i][4];
        }
    }
    for (i = 0; i < majors.length; i++) {
        if (majors[i][0] == '2016' && majors[i][3] == '5' && majors[i][4] / total > 0.1) {
            list_majors.push(majors[i][2]);
            list_majors.push(majors[i][4] / total);
        }
    }
    return list_majors;
}

var submitB = document.getElementById("submit");
submitB.addEventListener('click', function () {
    var input = document.getElementById("search_button").value;
    var filter = input.toUpperCase();
    //remove all list items
    d3.select("#suggestions").selectAll("li").remove();
    var college_names = colleges['college_names'];
    var college_ids = colleges['names'];
    var here = false;
    //search for the college name
    for (i = 0; i < college_names.length; i++) {
        //if it exists change var false to true
        if (college_names[i].toUpperCase() == filter) {
            here = true;
            collegeName = college_names[i];
            collegeId = college_ids[collegeName];
            generate_graphs(collegeName, colleges);
        }
    }
    //Print message if college doesn't exist
    if (!here) {
        d3.select("#suggestions").insert("li").text(input + " doesn't exist");
    }
});

function suggest() {
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
    for (i = 0; i < college_names.length; i++) {
        if (college_names[i].toUpperCase().indexOf(filter) > -1) {
            d3.select("#suggestions").insert("li").text(college_names[i]);
            ctr++;
        }
        //cut off at 5 list items
        if (ctr == 5) {
            break;
        }
    }
    //when user clicks a list item, change the search field to that item
    var clist = document.getElementsByTagName("li");
    for (i = 1; i < clist.length; i++) {
        clist[i].addEventListener('click', function () {
            console.log(this);
            input.value = this.innerText;
        });
    }
};
