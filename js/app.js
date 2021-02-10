//Authors : Harry Tom, Alwin Joy


function load_index(){

    document.getElementById('in').value = decodeURIComponent(window.location.search.substr(2));
    get();
}
function get(){
    document.getElementById("img").src = "resources/Transparent.png";   
    document.getElementById('img').style = "filter:blur(25px);";
    timeoutblur();
    document.getElementById('img').style = "display:block;";
    let search = decodeURIComponent(window.location.search.substr(2).toLowerCase());

    let url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&origin=*&titles="+ search.toLowerCase() +"&redirects=false";

    fetch(url).then(res => res.json()).then((jsondata) => {


        /* Parsing API Response*/
        var response = JSON.stringify(jsondata, undefined, 2)
        var suggestionData = JSON.parse(response);
        var pageid = Object.keys(suggestionData.query.pages)[0];

        /* Add Value into HTML Page */

        document.getElementById("content").innerHTML = suggestionData.query.pages[pageid].extract;

        
        nxt();

    }).catch(err => { throw err });

    let iurl = "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&origin=*&piprop=original&titles="+search;

    fetch(iurl).then(res => res.json()).then((jsondata) => {

        /* Parsing API Response*/
        var iresponse = JSON.stringify(jsondata, undefined, 2)
        var isuggestionData = JSON.parse(iresponse);
        var ipageid = Object.keys(isuggestionData.query.pages)[0];
        console.log(ipageid);

        document.getElementById("img").src = isuggestionData.query.pages[ipageid].original.source;

    }).catch(err => { throw err });


};

function timeoutblur(){
    setTimeout(unblur, 1000)
}

function go(){
    window.location.replace('index.html?=' + document.getElementById('in').value);
    document.title = document.getElementById('in').value;
    
}

function nxt(){
    if (document.getElementById("content").innerHTML != "undefined")
    {
        load();
        removeit();

    }
    else{
        document.getElementById("m-s").style = "display: none";
        window.location.replace("error.html#" + document.getElementById('in').value);
    }
};


function removeit(){
 
    var p1 = document.getElementById("See_also"); 
    var p2 = document.getElementById("Notes"); 
    var p3 = document.getElementById("External_links"); 
    var p4 = document.getElementById("References"); 
    var p5 = document.getElementById("Further_reading"); 
    var p6 = document.getElementById("Other_websites");
    load();
        
    p1.remove();p2.remove();p3.remove();p4.remove();p5.remove();p6.remove();


    document.getElementsByClassName('mw-empty-elt').remove();
}

function unblur(){
    document.getElementById('img').style = "filter:blur(0px);display:block;";   
    document.getElementsByClassName('mw-empty-elt').remove(); 
}

function err_load(){
    if(window.location.search.substr(2) != ''){
        document.getElementById('err-hash').textContent = window.location.hash.substr(1) + "?";
    }
    else{}
}

function search(){
    document.getElementById('s-b').style = "left:0px";
    document.getElementById('respo_nav').style = "display:none";
}
function h_se(){
    document.getElementById('s-b').style = "left:-100%";
    document.getElementById('respo_nav').style = "display:flex";
}

function sw(x) {
    if (x.matches) { // If media query matches
        document.getElementById('respo_nav').style = "display:none";
    } else {
        document.getElementById('respo_nav').style = "display:none";
    }
  }
  
  var x = window.matchMedia("(max-width: 700px)")
  sw(x) // Call listener function at run time
  x.addListener(sw)



function rez(){

    if (window.innerWidth>501){
        document.getElementById('s-b').style = "left:0px";
        document.getElementById('respo_nav').style = "display:none";
    }
    else{
        document.getElementById('s-b').style = "left:-100%";
        document.getElementById('respo_nav').style = "display:flex";
    }
}



