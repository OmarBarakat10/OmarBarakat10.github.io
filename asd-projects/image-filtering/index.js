// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here


function applyFilter(filterFunction){
for(var i = 0; i < image.length; i++){
  var row = image[i]
  for(var j = 0; j < row.length; j++){
    var rgbString = image[i][j];
    var rgbNumbers = rgbStringToArray(rgbString);
    filterFunction(rgbNumbers);
    rgbString = rgbArrayToString(rgbNumbers);
    image[i][j] = rgbString;
  }
}
} //this function goes through the image array's rows and columns and takes each string and changes the value of the red

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
  var background = image[0][0]
  for(var i = 0; i < image.length; i++){
   var row = image[i]
   for(var j = 0; j < row.length; j++){
      var rgbString = image[i][j];
      if (image[0][0] !== image[i][j]) {
        var rgbNumbers = rgbStringToArray(rgbString);
        filterFunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        image[i][j] = rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function

function keepInBounds(aNumber){
  return Math.max(0, Math.min(aNumber, 255));
}

// TODO 3: Create reddify function
function reddify(anArray) {
  anArray[RED] = 200;
}

// TODO 6: Create more filter functions

function decreaseBlue(yipee) {
  yipee[BLUE] = keepInBounds(yipee[BLUE] - 50);
}

function increaseGreenByBlue(um){
  um[GREEN] = keepInBounds(um[GREEN] + um[BLUE]);
}


// CHALLENGE code goes below here
