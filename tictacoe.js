alert("tic tac toe");

const forLoop = function(start, end, op){
	const recursiveLoop = function(start, end){
		if(start >= end) return;
		op(start);
		recursiveLoop(start + 1, end);
	}
	recursiveLoop(start, end);
}

const forEach = function(array, op){
	const recursiveLoop = function(start, end){
		if(start >= end) return;
		op(array[start]);
		recursiveLoop(start + 1, end);
	}
	recursiveLoop(0, array.length);
}
const printDiamondRecursive = function(h, c){
	const heightHalf = h/2.0 - 0.5;
	function d(index){
		return Math.floor(Math.abs(heightHalf - index));
	}
	forLoop(0,h, function(i){
		const distance = d(i);
		const charCount = h - distance*2;
		const spaceCount = h - charCount;
		var res = "";
		forLoop(0, spaceCount/2, function(i) { res += " "; });
		forLoop(0, charCount, function(i) { res += c; });
		forLoop(0, spaceCount/2, function(i) { res += " "; });
		console.log(res);
	});
}

const printDiamond= function(h, c){
	const heightHalf = h/2.0 - 0.5;
	function d(index){
		return Math.floor(Math.abs(heightHalf - index));
	}
	for(var i = 0; i < h; i++){
		const distance = d(i);
		const charCount = h - distance*2;
		const spaceCount = h - charCount;
		var res = "";
		forLoop(0, spaceCount/2, function(i) { res += " "; });
		forLoop(0, charCount, function(i) { res += c; });
		forLoop(0, spaceCount/2, function(i) { res += " "; });
		console.log(res);
	}
}

printDiamond(41, "#");


// xax
function isWonOrStalemate(gameState){
  for(var i = 0; i < gameState.length; i++){
    var line = gameState[i];
    var sum = '';
    for(var j = 0; j < line.length; j++){
      sum += gameState[i][j];
    }
    if(sum === 'xxx'){
    return 'x';
    }
    else if(sum === 'ooo'){
      return 'o';
    }
    var sum = '';
    for(var j = 0; j < line.length; j++){
      sum += gameState[j][i];
    }
    if(sum === 'xxx'){
    return 'x';
    }
    else if(sum === 'ooo'){
      return 'o';
    }

  }
  var sum = '';

  for(var i = 0; i < gameState.length; i++){
    sum += gameState[i][i];
  }
  if(sum === 'xxx'){
  return 'x';
  }
  else if(sum === 'ooo'){
    return 'o';
  }
  var sum = '';
  for(var i = 0; i < gameState.length; i++){
    sum += gameState[i][gameState.length-i-1];
  }
  if(sum === 'xxx'){
    return 'x';
  }
  else if(sum === 'ooo'){
    return 'o';
  }
  var countSpace = 0;
  for(var i = 0; i < gameState.length; i++){
    var line = gameState[i];
    for(var j = 0; j < line.length; j++){
      if(gameState[i][j] === ' ') countSpace++;
    }
  }
  if(countSpace === 0) return 's';
  return ' ';
}
function winActions(){
  var res = isWonOrStalemate(board);
  if(res === "x"){
    alert("X's Won");
    clearBoard();
    initBoard(); 
  }
  if(res === "o"){
    alert("O's Won");
    clearBoard();
    initBoard(); 

  }
  if(res === "s"){
    alert("Stalemate");
    clearBoard();
    initBoard(); 
  }
}
function getPossibleMoves(){
  var moves = [];
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      if(board[i][j] === " ")
        moves.push([i,j]);
    }
  }
  return moves;
}

function NextMove(state, isX){
  
  var moves = getPossibleMoves();
  var index = Math.floor(Math.random()*(moves.length-1));
  var res = moves[index];
  return res;
  
}

function makeMove(state, move, isX){
  var el = state[move[0]][move[1]];
  if(el === " "){
    state[move[0]][move[1]] = (isX)? 'x': 'o';
   
    return true;
  }
  return false;
}


var board;

function initBoard(){

  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
}
initBoard();

function getBoard(){
  return board;
}
var lineColor = "#gbg";

var canvas = document.getElementById('tic-tac-toe-board');
var context = canvas.getContext('2d');
var isX = true;
var canvasSize = 500;
var sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;

function addPlayingPiece (xCordinate,yCordinate,isX) {
   clearPlayingArea(xCordinate, yCordinate);

    if (isX) {
      drawX(xCordinate, yCordinate);
    } else {
      drawO(xCordinate, yCordinate);
    }
}

function clearPlayingArea (xCordinate, yCordinate) {
  context.fillStyle = "#fff";
  context.fillRect(
    xCordinate,
    yCordinate,
    sectionSize,
    sectionSize
  ); 
}
function drawO (xCordinate, yCordinate) {
  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  var radius = (sectionSize - 100) / 2;
  var startAngle = 0 * Math.PI; 
  var endAngle = 2 * Math.PI;

  context.lineWidth = 10;
  context.strokeStyle = "#01bBC2";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX (xCordinate, yCordinate) {
  context.strokeStyle = "#f1be32";

  context.beginPath();
  
  var offset = 50;
  context.moveTo(xCordinate + offset, yCordinate + offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

  context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

  context.stroke();
}

function drawLines (lineWidth, strokeStyle) {
  var lineStart = 4;
  var lineLenght = canvasSize - 5;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  for (var y = 1;y <= 2;y++) {  
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }

  for (var x = 1;x <= 2;x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }

  context.stroke();
}

function clearBoard(){
  context.fillStyle = "#fff";
  context.fillRect(
    0,
    0,
    canvasSize,
    canvasSize
  ); 
  drawLines(10, lineColor);

}
clearBoard();

function getCanvasMousePosition (event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

canvas.addEventListener('mouseup', function (event) {
  
  	var mouse = getCanvasMousePosition(event);
  	
	var xCordinate;
  	var yCordinate;

	  for (var x = 0;x < 3;x++) {
	    for (var y = 0;y < 3;y++) {
	      xCordinate = x * sectionSize;
	      yCordinate = y * sectionSize;

	      if (
	          mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
	          mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
	        ) {
	       	
	        if(makeMove(board, [x,y], isX)){
            addPlayingPiece(xCordinate, yCordinate, isX);
            isX = !isX;
             winActions();
          }
          var computerMove = NextMove(board, isX);
          if(makeMove(board, computerMove, isX)){

            addPlayingPiece(computerMove[0]*sectionSize, computerMove[1]*sectionSize, isX);
            isX = !isX;
            winActions();
          }
	      }
	    }
	  }

  drawLines(10, lineColor);
});
