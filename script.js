var numRows = 0;
var numCols = 0;
var cells = [];

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
                    cells[i*numRows+j] +
                    "</td>");
            }
            document.write("</tr>");
        }
        document.write("</table>");
    }
}

function toggleCell(i,j) {
    cells[i*numRows+j] = !cells[i*numRows+j];
    document.getElementById("cell" + ( i * numRows + j )).innerHTML=cells[i*numRows+j];
}

var gameTickLength = window.setInterval(nextTime, 1000);

function nextTime() {
    for ( var i = 0; i < numRows; i++ ) {
        for (var j = 0; j < numCols; j++) {
            evolveCell(i,j);
        }
    }
}

function evolveCell(i,j) {
    /*if ( cells[i*numRows+j+1] && cells[i*numRows+j-1] ||
        cells[i*numRows+j+1] && cells[i*(numRows-1)+j] ||
        cells[i*numRows+j+1] && cells[i*(numRows+1)+j] ||
        cells[i*numRows+j-1] && cells[i*(numRows-1)+j] ||
        cells[i*numRows+j-1] && cells[i*(numRows-1)+j] ||
        cells[i*(numRows-1)+j] && cells[i*(numRows-1)+j] ) {
        cells[i*numRows+j] = true;
        document.getElementById("cell" + ( i * numRows + j )).style.background="#ffaaaa";
    } else {
        cells[i*numRows+j] = false;
        document.getElementById("cell" + ( i * numRows + j )).style.background="#eeeeee";
    }*/
    if ( cells[i*numRows+j] > 0 ) {
        cells[i*numRows+j]++;
        document.getElementById("cell" + ( i * numRows + j )).innerHTML=cells[i*numRows+j];
        document.getElementById("cell" + ( i * numRows + j )).style.background="#88ddff";
    } else {
        document.getElementById("cell" + ( i * numRows + j )).style.background="#eeeeee";
    }
}

/*function cellUpdate(i,j,value) {
    cells[i*numRows+j] = value;
    document.getElementById("cell" + ( i * numRows + j )).innerHTML = cells[i*numRows+j];
}*/