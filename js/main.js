var positions = [];
var tiles = [];
var time = 0;
var moves = 0;
var counter = null;

$(document).ready(function(){
	setTimeout(function() {
		startGame();
	}, 300);
	
});

$(document).on('click', '.tile', function(){
	var num = $(this).attr('num');
	var tile = getTile(num);
	tile.move();
	addMove();
	checkGoal();
});

$(document).on('click', '#reset-button', function(){
	startGame();
});

function startGame(){
	resetContents();
	positions = loadPositions();
	generateTiles(positions);
	counter = setInterval(function(){
		time++;
		displayCurrentTime();
	}, 1000);
}

function resetContents(){
	positions = [];
	tiles = [];
	time = 0;
	moves = 0;
	clearInterval(counter);
}

function generateTiles(positions){
	console.log('Generating tiles');
	var position = null;
	var tile = null;
	for(var i = 1; i < 16; i ++){
		position = getRandomFreePosition(positions);
		tile = new Tile(position.x, position.y, i);
		tiles.push(tile);
		tile.insertTile();
		position.free = false;
		position = null;
		tile = null;
	}
}


function addMove(){
	moves++;
	$('#score-point .num').html(moves);
}

function displayCurrentTime(){
	var minutes = Math.floor(time / 60);
	var seconds = time - minutes * 60;
	
	$('#timepoint .num').html(convert(minutes) + ':' + convert(seconds));
}

function convert(n){
    return n > 9 ? "" + n: "0" + n;
}
