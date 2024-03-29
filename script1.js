document.addEventListener('DOMContentLoaded', function loadjs() {
    const gridDisplay = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    let squares = [];
    let score = 0;
    const width = 4;

    function createBoard() {
        for (let i = 0; i < 16; i++) {
            sqaure = document.createElement('div');
            sqaure.innerHTML = 0;
            gridDisplay.appendChild(sqaure);
            squares.push(sqaure);
        }
        generate();
        generate();
    }

    function generate() {
        randomElement = Math.floor(Math.random() * squares.length);
        if (squares[randomElement].innerHTML == 0) {
            squares[randomElement].innerHTML = 2;
            checkForGameOver();
        }
        else {
            generate();
        }
    }

    createBoard();

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let a = squares[i].innerHTML;
                let b = squares[i + 1].innerHTML;
                let c = squares[i + 2].innerHTML;
                let d = squares[i + 3].innerHTML;
                let row = [parseInt(a), parseInt(b), parseInt(c), parseInt(d)];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let a = squares[i].innerHTML;
                let b = squares[i + 1].innerHTML;
                let c = squares[i + 2].innerHTML;
                let d = squares[i + 3].innerHTML;
                let row = [parseInt(a), parseInt(b), parseInt(c), parseInt(d)];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let a = squares[i].innerHTML;
            let b = squares[i + width].innerHTML;
            let c = squares[i + (width * 2)].innerHTML;
            let d = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(a), parseInt(b), parseInt(c), parseInt(d)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let a = squares[i].innerHTML;
            let b = squares[i + width].innerHTML;
            let c = squares[i + (width * 2)].innerHTML;
            let d = squares[i + (width * 3)].innerHTML;
            let column = [parseInt(a), parseInt(b), parseInt(c), parseInt(d)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];
        }
    }

    function combineRows() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = total;
                squares[i + 1].innerHTML = 0;
                score += total;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = total;
                squares[i + width].innerHTML = 0;
                score += total;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function control(e) {
        if (e.keyCode === 37)
            keyLeft();
        else if (e.keyCode === 38)
            keyUp();
        else if (e.keyCode === 39)
            keyRight();
        else if (e.keyCode === 40)
            keyDown();
    }

    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRows();
        moveRight();
        generate();
    }

    function keyLeft() {
        moveLeft();
        combineRows();
        moveLeft();
        generate();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You WIN';
                document.removeEventListener('keyup', control);
                setTimeout(() => clear(), 3000);
            }
            else
                resultDisplay.innerHTML = 'Game Ongoing';
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0)
                zeros++;
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'You LOSE';
            document.removeEventListener('keyup', control);
            setTimeout(() => clear(), 3000);
        }
        else
            resultDisplay.innerHTML = 'Game Ongoing';
    }

    function addColours() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192';
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da';
            else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = '#ede0c8';
            else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#f2b179';
            else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = '#ffcea4';
            else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = '#e8c064';
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#ffab6e';
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982';
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c';
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff';
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5';
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0';
        }
    }
    addColours();

    var myTimer = setInterval(addColours, 50);
})

function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var minibut = document.getElementById("minibut");
    if (sidebar.style.width === "135px") {
        sidebar.style.width = "0px";
        minibut.style.left = "5px";
    }
    else {
        sidebar.style.width = "135px";
        minibut.style.left = "135px";
    }
}