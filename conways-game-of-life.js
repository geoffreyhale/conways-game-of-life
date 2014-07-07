/*
 * file: conways-game-of-life.js
 * author: Geoffrey Hale
 * url: www.geoffreyhale.com
 */




/*** Adjustable Parameters ***/
var matrixRows = 10;
var matrixCols = 16;

var colorNothing = "#fff"; // whitest
var colorBirth = "#dfd"; //
var colorAlive = "#080"; // colorest
var colorDying = "#5a5"; //
/***/



/*** FIXED GLOBALS ***/
var matrix = [];
var cellPopulation = 0;



/*** BEGIN MOUSE DOWN ***/
var mouseIsDown = false;
window.onload = function()
{
    document.onmousedown = docOnMousedown;
    document.onmouseup = docOnMouseup;
}
function docOnMousedown() { mouseIsDown = true; }
function docOnMouseup() { mouseIsDown = false; }
/*** END MOUSE DOWN ***/



/*** BEGIN TIMER ***/
var genTimer = null;
function stopTime() {
    if ( genTimer ) {
        clearInterval( genTimer ); genTimer = 0;
        document.getElementById("stopTimerButton").disabled = true;
        document.getElementById("startTimerButton").disabled = false;
    }
}
function startTime() {
    if ( !genTimer ) {
        genTimer = setInterval( function() { goNextGen() }, 1000 );
        document.getElementById("startTimerButton").disabled = true;
        document.getElementById("stopTimerButton").disabled = false;
    }
}

var generationCount = 0;
/*** END TIMER ***/





document.addEventListener('DOMContentLoaded', function() {
    drawMatrix();
    resetGame();
    startTime();
}, false);

function drawMatrix() {
    var toGrid = "";
    toGrid += "<table>";
    for ( var row = 0; row < matrixRows; row++ ) {
        toGrid += "<tr>";
        for ( var col = 0; col < matrixCols; col++ ) {
            toGrid += "<td id='cell-"+row+"-"+col+"' class='cellsClass'" +
                " onmousedown='toggleCell("+row+","+col+")'" +
                " onmouseover='toggleCell2(" + row + "," + col + ");'" +
                "></td>";
        }
        toGrid += "</tr>";
    }
    toGrid += "</table>";
    document.getElementById("gameGrid").innerHTML = toGrid;
}



function resetGame(opts) {
    generationCount = 0;
    initMatrix();
    setGame(opts);
    updateGameDisplay();
}

function initMatrix() {
    for (var row = 0; row < matrixRows; row++) {
        matrix[row] = {};
        for (var col = 0; col < matrixCols; col++) {
            matrix[row][col] = {};
        }
    }
}
function setGame(opts) {
    for (var row = 0; row < matrixRows; row++) {
        for (var col = 0; col < matrixCols; col++) {
            if (opts != null) {
                matrix[row][col].exists = 0;
            } else {
                matrix[row][col].exists = Math.floor(Math.random() * 2);
            }
        }
    }
}
function setGliderGame() {
    generationCount = 0;
    setGame(0);
    matrix[matrixRows-4][1].exists = 1;
    matrix[matrixRows-4][2].exists = 1;
    matrix[matrixRows-4][3].exists = 1;
    matrix[matrixRows-4][4].exists = 1;
    matrix[matrixRows-3][0].exists = 1;
    matrix[matrixRows-3][4].exists = 1;
    matrix[matrixRows-2][4].exists = 1;
    matrix[matrixRows-1][3].exists = 1;
    updateGameDisplay();
}



function updateGameDisplay() {

    cellPopulation = 0;
    for ( var row = 0; row < matrixRows; row++ ) {
        for ( var col = 0; col < matrixCols; col++ ) {
            var numFriends = getNumFriends(row, col);
            // Going to die:
            if ( matrix[row][col].exists &&
                ( numFriends < 2 || 3 < numFriends ) ) {
                cellPopulation++;
                document.getElementById("cell-" + row + "-" + col).style.background = colorDying;
            }
            // Alive and kicking:
            else if ( matrix[row][col].exists ) {
                cellPopulation++;
                document.getElementById("cell-" + row + "-" + col).style.background = colorAlive;
            }
            // Baby making:
            else if ( !matrix[row][col].exists && numFriends == 3 ) {
                document.getElementById("cell-" + row + "-" + col).style.background = colorBirth;
            }
            // Nothing much:
            else {
                document.getElementById("cell-" + row + "-" + col).style.background = colorNothing;
            }
            document.getElementById("cell-" + row + "-" + col).innerHTML = getNumFriends( row, col );
        }
    }

    var boardInfo = "Generation: " + generationCount +
        "<br/>Population: " + cellPopulation;
    document.getElementById("infoBoard").innerHTML = boardInfo;
}








function getNumFriends(row, col) {
    var friends = 0;

    var topEdge, rightEdge, bottomEdge, leftEdge;
    if ( row <= 0 ) { topEdge = true; }
    else if ( row >= matrixRows - 1 ) { bottomEdge = true; }
    if ( col <= 0 ) { leftEdge = true; }
    else if ( col >= matrixCols - 1 ) { rightEdge = true; }

    if ( !topEdge ) { if ( matrix[row-1][col].exists ) { friends++; } }
    if ( !topEdge && !rightEdge ) { if ( matrix[row-1][col+1].exists ) { friends++; } }
    if ( !rightEdge ) { if ( matrix[row][col+1].exists ) { friends++; } }
    if ( !bottomEdge && !rightEdge ) { if ( matrix[row+1][col+1].exists ) { friends++; } }
    if ( !bottomEdge ) { if ( matrix[row+1][col].exists ) { friends++; } }
    if ( !bottomEdge && !leftEdge ) { if ( matrix[row+1][col-1].exists ) { friends++; } }
    if ( !leftEdge ) { if ( matrix[row][col-1].exists ) { friends++; } }
    if ( !topEdge && !leftEdge ) { if ( matrix[row-1][col-1].exists ) { friends++; } }

    return friends;
}



function goNextGen() {
    var tempMatrix = $.extend( true, {}, matrix );
    for ( var row = 0; row < matrixRows; row++ ) {
        for ( var col = 0; col < matrixCols; col++ ) {
            var numFriends = getNumFriends(row, col);
            /*// 1) Any live cell with fewer than two live neighbors dies, as if caused by under-population;
            if ( matrix[row][col].exists && numFriends < 2 ) { tempMatrix[row][col].exists = 0; }
            // 2) Any live cell with two or three live neighbors lives on to the next generation;
            //if ( matrix[row][col] && 2 <= numFriends && numFriends <= 3 ) {};
            // 3) Any live cell with more than three live neighbors dies, as if by overcrowding; and
            if ( matrix[row][col].exists && 3 < numFriends ) { tempMatrix[row][col].exists = 0; }
            // 4) Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            if ( !matrix[row][col].exists && numFriends == 3 ) { tempMatrix[row][col].exists = 1; }
            */
            if ( numFriends < 2 ) { tempMatrix[row][col].exists = 0; }
            else if ( numFriends == 3 ) { tempMatrix[row][col].exists = 1; }
            else if ( numFriends > 3 ) { tempMatrix[row][col].exists = 0; }
        }
    }

    matrix = tempMatrix;
    generationCount++;

    updateGameDisplay();
}









/*** USER INPUT BEGIN ***/

var toggleTo = true;

function toggleCell( row, col ) {
    matrix[row][col].exists = !matrix[row][col].exists;
    toggleTo = matrix[row][col].exists;
    updateGameDisplay();
}

function toggleCell2( row, col ) {
    if ( mouseIsDown ) {
        matrix[row][col].exists = toggleTo;//!matrix[row][col].exists;
        updateGameDisplay();
    }
}

/*** USER INPUT END ***/










