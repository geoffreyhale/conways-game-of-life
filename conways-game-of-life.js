

// 1. Initialization
// 2. User adjustment & instant visual update
// 3. Generation Pass & update






var matrix = [];
var matrixRows = 16;
var matrixCols = 32;

var cellPopulation = 0;



document.addEventListener('DOMContentLoaded', function() {
    init();
}, false);

function init() {
    initMatrix();
    drawMatrix();
    updateMatrix();
    updateInfoBoard();
}

function initMatrix() {
    for ( var row = 0; row < matrixRows; row++ ) {
        matrix[row] = [];
        for ( var col = 0; col < matrixCols; col++ ) {
            matrix[row][col] = Math.floor( Math.random() * 2 );
        }
    }
}

function drawMatrix() {
    var toGrid = "";
    toGrid += "<table class='conways-game-of-life'>";
    for ( var row = 0; row < matrixRows; row++ ) {
        toGrid += "<tr>";
        for ( var col = 0; col < matrixCols; col++ ) {
            toGrid += "<td id='cell-"+row+"-"+col+"' class='conways-game-of-life' onClick='toggleCell("+row+","+col+")'></td>";
        }
        toGrid += "</tr>";
    }
    toGrid += "</table>";
    document.getElementById("gameGrid").innerHTML = toGrid;
}

function updateMatrix() {
    cellPopulation = 0;
    for ( var row = 0; row < matrixRows; row++ ) {
        for ( var col = 0; col < matrixCols; col++ ) {
            updateCell( row, col );
            if ( matrix[row][col] ) {
                cellPopulation++;
            }
        }
    }
}

function updateCell( row, col ) {
    if ( matrix[row][col] ) {
        document.getElementById("cell-" + row + "-" + col).style.background = "yellow";
    } else {
        document.getElementById("cell-" + row + "-" + col).style.background = "#f0f0f0";
    }
    document.getElementById("cell-" + row + "-" + col).innerHTML = getNumFriends( row, col );
}



function getNumFriends(row, col) {
    var friends = 0;

    var topEdge, rightEdge, bottomEdge, leftEdge;
    if ( row <= 0 ) { topEdge = true; }
    else if ( row >= matrixRows - 1 ) { bottomEdge = true; }
    if ( col <= 0 ) { leftEdge = true; }
    else if ( col >= matrixCols - 1 ) { rightEdge = true; }

    if ( !topEdge ) { if ( matrix[row-1][col] ) { friends++; } }
    if ( !topEdge && !rightEdge ) { if ( matrix[row-1][col+1] ) { friends++; } }
    if ( !rightEdge ) { if ( matrix[row][col+1] ) { friends++; } }
    if ( !bottomEdge && !rightEdge ) { if ( matrix[row+1][col+1] ) { friends++; } }
    if ( !bottomEdge ) { if ( matrix[row+1][col] ) { friends++; } }
    if ( !bottomEdge && !leftEdge ) { if ( matrix[row+1][col-1] ) { friends++; } }
    if ( !leftEdge ) { if ( matrix[row][col-1] ) { friends++; } }
    if ( !topEdge && !leftEdge ) { if ( matrix[row-1][col-1] ) { friends++; } }

    return friends;
}



function goNextGen() {
    var tempMatrix = matrix;
    for ( var row = 0; row < matrixRows; row++ ) {
        for ( var col = 0; col < matrixCols; col++ ) {
            var numFriends = getNumFriends(row, col);
            // 1) Any live cell with fewer than two live neighbors dies, as if caused by under-population;
            if ( matrix[row][col] && numFriends < 2 ) { tempMatrix[row][col] = 0; }
            // 2) Any live cell with two or three live neighbors lives on to the next generation;
            //if ( matrix[row][col] && 2 <= numFriends && numFriends <= 3 ) {};
            // 3) Any live cell with more than three live neighbors dies, as if by overcrowding; and
            if ( matrix[row][col] && 3 < numFriends ) { tempMatrix[row][col] = 0; }
            // 4) Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            if ( !matrix[row][col] && numFriends == 3 ) { tempMatrix[row][col] = 1; }
        }
    }
    matrix = tempMatrix;
    generationCount++;

    updateMatrix();
    updateInfoBoard();
}



function toggleCell( row, col ) {
    matrix[row][col] = !matrix[row][col];
    updateMatrix();
    updateInfoBoard();
}



/**********
 * TIMER
 * **********/

var generationDelay = 2000; //ms

var gameGenerationTimer;
var timeOn = false;
function turnTimeOn() { if ( !timeOn ) { gameGenerationTimer = window.setInterval(goNextGen,generationDelay); timeOn = true; } }
function turnTimeOff() { clearInterval(gameGenerationTimer); timeOn = false; }

var generationCount = 0;




function updateInfoBoard() {
    var boardInfo = "Generation: " + generationCount +
        "<br/>Population: " + cellPopulation;
    document.getElementById("infoBoard").innerHTML = boardInfo;
}