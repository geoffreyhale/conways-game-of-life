var matrix = [];
var matrixRows = 8;
var matrixCols = 10;



function initMatrix() {
    for ( var row = 0; row < matrixRows; row++ ) {
        matrix[row] = [];
        for ( var col = 0; col < matrixCols; col++ ) {
            matrix[row][col] = ( row * matrixCols + col ) % 2;
        }
    }
}



function drawMatrix() {
    var toGrid = "";
    toGrid += "<table>";
    for ( var row = 0; row < matrixRows; row++ ) {
        toGrid += "<tr>";
        for ( var col = 0; col < matrixCols; col++ ) {
            toGrid += "<td id='cell-"+row+"-"+col+"'>" + matrix[row][col] + "</td>";
        }
        toGrid += "</tr>";
    }
    toGrid += "</table>";
    document.getElementById("grid").innerHTML = toGrid;
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
            if ( matrix[row][col] && numFriends < 2 ) { tempMatrix[row][col] = false; }
            // 2) Any live cell with two or three live neighbors lives on to the next generation;
            //if ( matrix[row][col] && 2 <= numFriends && numFriends <= 3 ) {};
            // 3) Any live cell with more than three live neighbors dies, as if by overcrowding; and
            if ( matrix[row][col] && 3 < numFriends ) { tempMatrix[row][col] = false; }
            // 4) Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            if ( !matrix[row][col] && numFriends == 3 ) { tempMatrix[row][col] = true; }
        }
    }
    matrix = tempMatrix;
    updateMatrix();
}



function updateMatrix() {
    alert("inside updateMatrix");
    for ( var row = 0; row < matrixRows; row++ ) {
        for ( var col = 0; col < matrixCols; col++ ) {
            document.getElementById("cell-"+row+"-"+col).innerHTML = matrix[row][col];
            if ( matrix[row][col] ) {
                document.getElementById("cell-" + row + "-" + col).style.background = "yellow";
            } else {
                document.getElementById("cell-" + row + "-" + col).style.background = "#f0f0f0";
            }
        }
    }
}