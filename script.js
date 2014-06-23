var numRows = 0;
var numCols = 0;
var cells = [];
var ticksPassed = 0;

function makeTable(inumRows,inumCols) {
    numRows = inumRows;
    numCols = inumCols;
    for ( var i = 0; i < numRows; i++ ) {
        for ( var j = 0; j < numCols; j++ ) {
            cells.push(false);
        }
    }
}

function drawTable() {
    if ( numRows && numCols ) {
        document.write("<table>");
        for ( var i = 0; i < numRows; i++ ) {
            document.write("<tr>");
            for ( var j = 0; j < numCols; j++ ) {
                document.write("<td id='cell" + ( i * numRows + j ) + "' onClick='toggleCell("+i+","+j+")'>" +
                    numAdjacent(i, j) +
                    "</td>");
            }
            document.write("</tr>");
        }
        document.write("</table>");
    }
    document.write("Tick #:<span id='ticksPassed'>" + ticksPassed + "</span>");
}


/*** USER ACTIONS ***/
function toggleCell(i,j) {
    cells[i*numRows+j] = !cells[i*numRows+j];
    document.getElementById("cell" + ( i * numRows + j )).innerHTML = numAdjacent(i, j);
    cellColorUpdate(i,j);
}


/*** GAME TIMER ***/
var gameTickLength = window.setInterval(nextTick, 2000);
function nextTick() {
    ticksPassed++;
    document.getElementById("ticksPassed").innerHTML=ticksPassed;
    evolveCells();
    for ( var i = 0; i < numRows; i++ ) {
        for (var j = 0; j < numCols; j++) {
            cellColorUpdate(i,j);
        }
    }
}

function evolveCells() {
    var tempCells = cells;
    for ( var i = 0; i < numRows; i++ ) {
        for (var j = 0; j < numCols; j++) {
            if ( numAdjacent(i, j) > 0 ) {
                tempCells[i * numRows + j] = true;
            } else {
                tempCells[i * numRows + j] = false;
            }
            document.getElementById("cell" + ( i * numRows + j )).innerHTML = numAdjacent(i, j);
        }
    }
    cells = tempCells;
}

function numAdjacent(i,j) {
    var num = 0;
    if ( cells[(i-1)*numRows+j] ) { num++; }
    if ( cells[(i+1)*numRows+j] ) { num++; }
    if ( cells[(i)*numRows+j-1] ) { num++; }
    if ( cells[(i)*numRows+j+1] ) { num++; }
    return num;
}

function cellColorUpdate(i,j) {
    if ( cells[i*numRows+j] == true ) {
        document.getElementById("cell" + ( i * numRows + j )).style.background="pink";
    } else {
        document.getElementById("cell" + ( i * numRows + j )).style.background="#f8f8f8";
    }
}