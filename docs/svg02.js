// Clyde "Thluffy" Sinclair
// SoftDev pd0
// K09 -- basic SVG work
// 2019-03-13w


var pic = document.getElementById("vimage");
var wipe = document.getElementById("but_clear");

//coords of last placed dot
var lastX = 0;
var lastY = 0;

//
var createDot = function(e)
{
  console.log("running . . .");

  //store click location, relative to "canvas"
  var newX = e.offsetX;
  var newY = e.offsetY;
  var counter=-1

  var newdot = document.createElementNS(
    "http://www.w3.org/2000/svg", "circle");
  newdot.setAttribute("fill", "red");
  newdot.setAttribute("cx", newX);
  newdot.setAttribute("cy", newY);
  newdot.setAttribute("r", 10)
  newdot.addEventListener("click", function(){
    counter+=1;
    console.log(counter)
    if (counter%2==0){
      console.log("Turning blue")
      newdot.setAttribute("fill", "blue");
    }
    if(counter%2==1 && counter>0){
      console.log("Wacky")

      newdot.setAttribute("cx", Math.random()*500);
      newdot.setAttribute("cy", Math.random()*500);
      newdot.setAttribute("fill", "red");
    }
  });
  if  (e.offsetX<lastX-10 && e.offsetX>lastX+10 && e.offsetY<lastY-10  && e.offsetY>lastY+10){
      pic.appendChild(newdot);
  }

  lastX = newX;
  lastY = newY;


}

pic.addEventListener("click", createDot);


//sequentially remove all dots and lines from "canvas"
wipe.addEventListener(
  "click", function()
  {
    var fc = pic.firstChild;
    while(fc) {
      console.log("removing " + fc + "...");
      pic.removeChild(fc);
      fc = pic.firstChild;
    }
    lastX = null;
    lastY = null;
  });
