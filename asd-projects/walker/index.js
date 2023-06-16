/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on("keyup", handleKeyUp);    
  var positionX = 0; // the x-coordinate location for the box
  var speedX = 0; // the speed for the box along the x-axis
  var positionY = 0; // the y-coordinate location for the box
  var speedY = 0; // the speed for the box along the y-axis
  



  var KEY = {
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40
  } // the key codes and their directions



  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    //redraws and repoitions the walker each time a new frame is made
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {  
    if (event.which === KEY.LEFT) {
        console.log("left pressed");
        speedX = -5;
    } else if (event.which === KEY.RIGHT) {
      console.log("right pressed");
      speedX = +5;
    } else if (event.which === KEY.DOWN) {
      console.log("down pressed");
      speedY = +5;
    } else if (event.which === KEY.UP) {
      console.log("up pressed");
      speedY = -5;
    } 
  } 
  //Determines which key was pressed down and logs the keycode in the console
  //also changes the speed of the direction it travels based on what key was pressed

  function handleKeyUp(event) {  
    if (event.which === KEY.LEFT) {
      speedX = 0;
    } else if (event.which === KEY.RIGHT) {
      speedX = 0;
    } else if (event.which === KEY.DOWN) {
      speedY = 0;
    } else if (event.which === KEY.UP) {
      speedY = 0;
    } 
  } 

  //determines which key was released, and when it is released it sets the speed to 0 so it doesnt continue moving

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
  function repositionGameItem() {
    positionX += speedX; // update the position of the box along the x-axis
    positionY += speedY; // update the position of the box along the y-axis
  } 

  function redrawGameItem() {
    $("#walker").css("left", positionX);    // draw the box in the new location, positionX pixels away from the "left"
    $("#walker").css("top", positionY);    // draw the box in the new location, positionY pixels away from the "top"
  }
  

}