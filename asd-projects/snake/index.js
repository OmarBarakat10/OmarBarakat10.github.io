/* global $, sessionStorage*/

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* NOTESS

apple.element: A reference to the HTML element that represents the Apple.
apple.row: A reference to the row where the Apple currently exists.
apple.column: A reference to the column where the Apple currently exists.
The apple.element Object will be needed in order to make any modifications 
to the Apple's HTML element using jQuery (more on jQuery in the next section).
The apple.row and apple.column properties will be useful for determining when the Snake collides with the Apple.

We can refer to each part of the snake as a snakeSquare Object which will have the following properties:
snakeSquare.element: A reference to the HTML element that represents a part of the snake.
snakeSquare.row: A reference to the row where the snakeSquare currently exists.
snakeSquare.column: A reference to the column where the snakeSquare currently exists.
snakeSquare.direction: A reference to the direction that this particular snakeSquare is currently moving in.
The snakeSquare.element Object will be needed to modify the HTML element using jQuery. 
The snakeSquare.row, snakeSquare.column, and snakeSquare.direction properties will all 
be useful in determining the movement of that particular snakeSquare.

This data will be stored in the snake Object:

snake.body: An Array containing all snakeSquare Objects.
snake.head: Reference to the jQuery snakeSquare Object at the head of the snake. Duplicate of snake.body[0]
snake.tail: Reference to the jQuery snakeSquare Object at the end of the snake. Duplicate of snake.body[snake.body.length - 1]
*/

// HTML jQuery Objects
var board = $('#board');
var scoreElement = $('#score');
var highScoreElement = $('#highScore');

// game variables
var snake = {};
var apple = {};
var score = 0;

// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

// interval variable required for stopping the update function when the game ends
var updateInterval;

// variable to keep track of the key (keycode) last pressed by the user
var activeKey;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO: turn on keyboard inputs
$('body').on('keydown', handleKeyDown);

// start the game
init();

function init() {
  // initialize the snake's body as an empty Array
  snake.body = [];

  // make the first snakeSquare and set it as the head
  makeSnakeSquare(10, 10);
  snake.head = snake.body[0];
  
  // TODO 8: initialize the first apple
 makeApple();

  // start update interval
  updateInterval = setInterval(update, 100);
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* 
 * On each update tick update each bubble's position and check for
 * collisions with the walls.
 */
function update() {
  moveSnake();
  
  if (hasHitWall() || hasCollidedWithSnake()) {
    endGame();
  }
  
  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }
  
}

function moveSnake() {
  /* 
  TODO 11: Move each part of the snake's body such that it's body follows the head.
  
  HINT: To complete this TODO we must figure out the next direction, row, and 
  column for each snakeSquare in the snake's body. The parts of the snake are 
  stored in the Array snake.body and each part knows knows its current 
  column/row properties. 
  
  */

  for (var i = 1; i <= snake.body.length; i++) {
    var snakeSquare = snake.body[i];
    
    var nextSnakeSquare = snake.body[i+1];
    var nextRow = snake.body.row + 1;
    var nextColumn = snake.body.column + 1;
    var nextDirection = snake.body.direction;
    
    snakeSquare.direction = nextDirection;
    snakeSquare.row = nextRow;
    snakeSquare.column = nextColumn;
    repositionSquare(snakeSquare);
  }
  
   
  //Before moving the head, check for a new direction from the keyboard input
 checkForNewDirection();

  
  /* 
  TODO 6: determine the next row and column for the snake's head
  */

  if (snake.head.direction === 'left') {
  snake.head.column = snake.head.column - 1;
  } else if (snake.head.direction === 'right') {
    snake.head.column = snake.head.column + 1;
  } else if (snake.head.direction === 'down') {
  snake.head.row = snake.head.row + 1;
  } else if (snake.head.direction === 'up'){
    snake.head.row = snake.head.row - 1;
  } 
  repositionSquare(snake.head);

  /*
  HINT: The snake's head will need to move forward 1 square based on the value
  of snake.head.direction which may be one of "left", "right", "up", or "down"
  */
  
  
}

function checkForNewDirection(event) {
  /* 
  TODO 5: Update snake.head.direction based on the value of activeKey.
  
  BONUS: Only allow direction changes to take place if the new direction is
  perpendicular to the current direction
  */

  if (activeKey === KEY.LEFT) { 
    snake.head.direction = "left"; 
  } else if (activeKey === KEY.RIGHT) { 
    snake.head.direction = "right"; 
  } else if (activeKey === KEY.DOWN) { 
    snake.head.direction = "down"; 
  } else { 
    snake.head.direction = "up"; 
  } 

  // FILL IN THE REST
  
  //console.log(snake.head.direction);     // uncomment me!
}

function hasCollidedWithApple() {
  /* 
  TODO 9: Should return true if the snake's head has collided with the apple, 
  false otherwise
  
  HINT: Both the apple and the snake's head are aware of their own row and column
  */
  
  if (snake.head.row === apple.row && snake.head.column === apple.column) {
    return true;
  } else {
    return false;
  }
}

function handleAppleCollision() {
  // increase the score and update the score DOM element
  score++;
  scoreElement.text("Score: " + score);
  
  // Remove existing Apple and create a new one
  apple.element.remove();
  makeApple();
  
  /* 
  TODO 10: determine the location of the next snakeSquare based on the .row,
  .column and .direction properties of the snake.tail snakeSquare
  
  HINT: snake.tail.direction will be either "left", "right", "up", or "down".
  If the tail is moving "left", place the next snakeSquare to its right. 
  If the tail is moving "down", place the next snakeSquare above it.
  etc...
  */ 
  var row = snake.tail.row + 0;
  var column = snake.tail.column + 0;
  
  // code to determine the row and column of the snakeSquare to add to the snake
  
  if (snake.tail.direction === "left") {
    makeSnakeSquare(row, column+1);
  } else if (snake.tail.direction === "down") {
    makeSnakeSquare(row+1, column);
  } else if (snake.tail.direction === "up") {
    makeSnakeSquare(row-1, column);
  } else {
    makeSnakeSquare(row, column-1);
  } 

}

function hasCollidedWithSnake() {
  /* 
  TODO 12: Should return true if the snake's head has collided with any part of the
  snake's body.
  
  HINT: Each part of the snake's body is stored in the snake.body Array. The
  head and each part of the snake's body also knows its own row and column.
  
  */
  
  return false;
}

function hasHitWall() {
  /* 
  TODO 7: Should return true if the snake's head has collided with the four walls of the
  board, false otherwise.

  HINT: What will the row and column of the snake's head be if this were the case?
  */

  if (snake.head.row === ROWS)  {
    return true
  } else if (snake.head.row === ROWS-ROWS)  {
    return true
  } else if (snake.head.column === COLUMNS)  {
    return true
  } else if (snake.head.column === COLUMNS-COLUMNS)  {
    return true
  } else {
    return false
  };

}

function endGame() {
  // stop update function from running
  clearInterval(updateInterval);

  // clear board of all elements
  board.empty();
  
  // update the highScoreElement to display the highScore
  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;

  // restart the game after 500 ms
  setTimeout(init, 500);


}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* Create an HTML element for a snakeSquare using jQuery. Then, given a row and
 * column on the board, position it on the screen. Finally, add the new 
 * snakeSquare to the snake.body Array and set a new tail.
 */
function makeSnakeSquare(row, column) {  
  // initialize a new snakeSquare Object
  var snakeSquare = {}
  
  // make the snakeSquare.element Object and append it to the board
  snakeSquare.element = $('<div>').addClass('snake').appendTo(board);
  
  // initialize the row and column properties on the snakeSquare Object
  snakeSquare.row = row;
  snakeSquare.column = column;

  // set the position of the snake on the screen
  repositionSquare(snakeSquare);
  
  // if this is the head, add the snake-head id
  if (snake.body.length === 0) {
    snakeSquare.element.attr('id', 'snake-head');
  }

  // add snakeSquare to the end of the body Array and set it as the new tail
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

/* Given a gameSquare (which may be a snakeSquare or the apple), position 
 * the gameSquare on the screen. 
 */
function repositionSquare(square) {
  var squareElement = square.element;
  var row = square.row;
  var column = square.column;
  
  var buffer = 20;
  
  // position the square on the screen according to the row and column
  squareElement.css('left', column * SQUARE_SIZE + buffer);
  squareElement.css('top', row * SQUARE_SIZE + buffer);
}

/* Create an HTML element for the apple using jQuery. Then find a random 
 * position on the board that is not occupied and position the apple there.
 */
function makeApple() {
  // make the apple jQuery Object and append it to the board
  apple.element = $('<div>').addClass('apple').appendTo(board);

  // get a random available row/column on the board 
  var randomPosition = getRandomAvailablePosition();

  // initialize the row/column properties on the Apple Object
  apple.row = randomPosition.row;
  apple.column = randomPosition.column;

  // position the apple on the screen
  repositionSquare(apple);
}

/* Returns a (row,column) Object that is not occupied by another game component 
 */
function getRandomAvailablePosition() {
  var spaceIsAvailable;
  var randomPosition = {};
  
  /* Generate random positions until one is found that doesn't overlap with the snake */
  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);
    spaceIsAvailable = true;
    
    /*
    TODO 13: After generating the random position determine if that position is
    not occupied by a snakeSquare in the snake's body. If it is then set 
    spaceIsAvailable to false so that a new position is generated.
    */
  }
  
  return randomPosition;
}

/* 
  event.which returns the keycode of the key that is pressed when the
  keydown event occurs
  
  The KEY Object creates a map for the Arrow Keys to their keycode:

    KEY.LEFT = 37
    KEY.UP = 38
    KEY.RIGHT = 39
    KEY.DOWN = 40
  */
function handleKeyDown(event) {
  activeKey = event.which;
  console.log(activeKey);
}


function calculateHighScore() {
  // retrieve the high score from session storage if it exists, or set it to 0
  var highScore = sessionStorage.getItem("highScore") || 0;

  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }
  
  return highScore;
}
