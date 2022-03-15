var grid = document.getElementById("grid");
var flags = 0
let bomb = 0
let scr = 0
var testMode = false;
var counter = 100;
var a = 1000;
setInterval(function() {
    counter--;
    if (counter >= 0) {
        id = document.getElementById('count');
        id.innerHTML = counter;

    }
    if (counter == 0) {
        document.getElementById("gameover").innerHTML = "TIME OVER";
    }




}, a)

generateGrid();

function generateGrid() {
    grid.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        row = grid.insertRow(i);
        for (var j = 0; j < 10; j++) {
            cell = row.insertCell(j);
            /*cell.onclick = function() {
                clickCell(this);
            };*/
            cell.addEventListener('click', function(e) {
                clickCell(this);

            })
            cell.addEventListener('contextmenu', function(event) {
                event.preventDefault()
                addflag(this)


            })



            var mine = document.createAttribute("data-mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
            document.getElementById("gameover").innerHTML = "";
            document.getElementById("count").innerHTML = "100"
            counter = 100
            a = 1000

        }


    }


}



addMines();

//add flag 
function addflag(cell) {
    /* if (cell.getAttribute("data-mine") == "true") {
        revealMines();
        let o = document.getElementById("gameover").innerHTML = "GAME OVER";
    }*/
    if (!cell.classList.contains('clicked') && (flags < bomb)) {
        if (!cell.classList.contains('flag')) {
            cell.classList.add('flag')
            cell.innerHTML = "⛳"
            flags++
            if (cell.getAttribute("data-mine") == "true") {
                scr++
                console.log(scr)

            }
            if (scr == bomb - 1) {
                let d = document.getElementById("gameover").innerHTML = "  YOU WIN";
                document.getElementById("count").innerHTML = ""
                counter = 0
                a = 0

            }


        } else {
            cell.classList.remove('flag')
            cell.innerHTML = ''
            flags--
        }


    }


}

function addMines() {
    //Add mines random 
    for (var i = 0; i < 20; i++) {
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var cell = grid.rows[row].cells[col];
        //cell.classList.add("flag");
        //console.log(row, col)
        cell.setAttribute("data-mine", "true");
        cell.innerHTML = "x"
        bomb++


    }
    //console.log(x)
    //console.log(y)
    console.log(bomb)

}

function revealMines() {
    //Highlight all mines in red
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var cell = grid.rows[i].cells[j];
            if (cell.getAttribute("data-mine") == "true") {
                cell.className = "mine";
                cell.innerHTML = "💣"



            }
        }
    }
}

function checkLevelCompletion() {
    var levelComplete = true;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if ((grid.rows[i].cells[j].getAttribute("data-mine") == "false") && (grid.rows[i].cells[j].innerHTML == "")) levelComplete = false;
        }
    }
    if (levelComplete) {
        let d = document.getElementById("gameover").innerHTML = "  YOU WIN";
        document.getElementById("count").innerHTML = ""
        counter = 0
        a = 0
        revealMines();
    }

}

function clickCell(cell) {
    if (cell.getAttribute("data-mine") == "true") {
        revealMines();
        let o = document.getElementById("gameover").innerHTML = "Game Over";
        document.getElementById("count").innerHTML = ""
        counter = 0
        a = 0


    } else {
        cell.className = "clicked";
        //Count and display the number of adjacent mines
        var mineCount = 0;
        var cellRow = cell.parentNode.rowIndex;
        var cellCol = cell.cellIndex;
        for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
            for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") mineCount++;
            }
        }
        cell.innerHTML = mineCount;
        if (mineCount == 0) {
            cell.innerHTML = ""
            for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
                for (var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
                    //Recursive Call
                    if (grid.rows[i].cells[j].innerHTML == "") clickCell(grid.rows[i].cells[j]);

                }
            }
        }
        //checkLevelCompletion();

    }
}