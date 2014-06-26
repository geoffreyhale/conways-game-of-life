



// TIMER:
var ticksPassed = 0;
//var gameTickLength = window.setInterval(nextTick, 2000);
function nextTick() {
    ticksPassed++;
    document.getElementById("ticksPassed").innerHTML=ticksPassed;

    lifeHappens();
    updateCellFeedback();
}



// Cell object constructor
function Cell() { this.exists = false; }

var arrayOfCells = new Array();

var rowsOfCells = 4;
var colsOfCells = 8;
var sizeOfArrayOfCells = rowsOfCells*colsOfCells;

for ( var i = 0; i < sizeOfArrayOfCells; i++ ) {
    arrayOfCells.push(new Cell());
}

function id_ij(i,j) {
    return i * colsOfCells + j;
}

// DRAW INITIAL TABLE:
document.write("<table>");
for ( var i = 0; i < rowsOfCells; i++ ) {
    document.write("<tr>");
    for ( var j = 0; j < colsOfCells; j++ ) {
        var idOfCell = id_ij(i,j);
        document.write("<td id='cell" + idOfCell + "' " +
                "onClick='toggleCellExist(" + idOfCell + ")'>" +
                "<span class='idCellTable'>" + idOfCell + "</span>" +
                "<br/><span id='nAC" + idOfCell + "' class='numAdjacentCells'>a:" + numAdjacentCells(idOfCell) + "</span>" +
                "</td>"
        );
    }
    document.write("</tr>");
}
document.write("</table>");

document.write("<br/>Number of ticks passed:<span id='ticksPassed'> " + ticksPassed + "</span>");



// INITIAL COLORING:
for ( var idOfCell = 0; idOfCell < arrayOfCells.length; idOfCell++ ) {
    updateCellColor ( idOfCell );
}


function toggleCellExist( idOfCell ) {
    arrayOfCells[idOfCell].exists = !arrayOfCells[idOfCell].exists;
    updateCellFeedback();
}



function updateCellFeedback() {
    for ( var idOfCell = 0; idOfCell < arrayOfCells.length; idOfCell++ ) {
        updateCellValueAdjacentCells( idOfCell );
        updateCellColor( idOfCell );
    }
}

function numAdjacentCells( idOfCell ) {
    var num = 0;
    var col = idOfCell % colsOfCells;
    var row = Math.floor( idOfCell / colsOfCells );
    if ( col > 0 && arrayOfCells[idOfCell-1].exists ) { num++; }
    if ( col < (colsOfCells - 1) && arrayOfCells[idOfCell+1].exists ) { num++; }
    if ( row > 0 && arrayOfCells[idOfCell-colsOfCells].exists ) { num++; }
    if ( row < (rowsOfCells - 1) && arrayOfCells[idOfCell+colsOfCells].exists ) { num++; }
    return num;
}

function updateCellColor( idOfCell ) {
    if ( arrayOfCells[idOfCell].exists ) {
        document.getElementById( "cell" + idOfCell ).style.background="pink";
    } else {
        document.getElementById( "cell" + idOfCell ).style.background="lightgrey";
    }
}

function updateCellValueAdjacentCells( idOfCell ) {
    document.getElementById( "nAC" + idOfCell).innerHTML = numAdjacentCells(idOfCell);
}

function lifeHappens() {
    var tempArray = arrayOfCells;
    for ( var idOfCell = 0; idOfCell < arrayOfCells.length; idOfCell++ ) {
        if ( numAdjacentCells(idOfCell) > 1 ) {
            tempArray[idOfCell].exists = true;
        } else {
            tempArray[idOfCell].exists = false;
        }
    }
    arrayOfCells = tempArray;
}



