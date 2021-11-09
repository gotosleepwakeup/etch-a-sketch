// query selectors
let wrapper = document.querySelector('#wrapper');
let dialogContent = document.querySelector('#dialog-content');
let rows = [];
let squares = [];

function hoverSquare() {
    this.classList.add('square-hover');
}

function createGrid(resolution) {
    wrapper.innerHTML = '';
    for (let i = 0; i < resolution; i++) {

        // creates rows
        let row = document.createElement('div');
        row.className = 'row';
        wrapper.appendChild(row);
        rows.push(row);
    
        // creates squares for each row
        for (let j = 0; j < resolution; j++) {
            let square = document.createElement('div');
            square.className = 'square';
            row.appendChild(square);
            squares.push(square);
    
            // listens to hover on the squares
            square.addEventListener('mouseover', hoverSquare);
        }
    }
}
createGrid(1);


console.log(rows);
console.log(squares);

function randomizeSquares() {
    squares.forEach(square => {
        if (Math.random() < 0.5) {
            square.classList.add('square-hover');
        } else {
            square.classList.remove('square-hover');
        }
    });
}

let outputNum = "";
function writeNumber(e) {
    // TODO: animate numbers in
    // TODO: flashy animation on grid as a preview of grid size
    let inputNum = +e.key;

    // disallow leading zeros
    if (outputNum.length == 0 && inputNum == 0) {
        return;
    }

    // restrict numbers to only 0-9
    if (inputNum >= 0 && inputNum <= 9) {

        // disallow length greater than 3
        if (outputNum.length < 3) {
            let holdNum = outputNum;
            outputNum = outputNum + e.key;

            // disallow numbers over 100
            if (+outputNum > 100) {
                outputNum = holdNum;
                return;
            } else {

                // write the number
                dialogContent.textContent = outputNum;
                dialogContent.classList.add("dialog-large-numbers");
                createGrid(+outputNum);
                randomizeSquares();
            }
        }

    }

    if (e.key == "Backspace" && outputNum.length != 0) {
        outputNum = outputNum.slice(0, -1);
        dialogContent.textContent = outputNum;
    }

    if (outputNum.length == 0) {
        dialogContent.textContent = "Type any number between 1 and 100."
        dialogContent.classList.remove("dialog-large-numbers");
    }
    console.log(e.key);
}

// keypress events
document.addEventListener('keydown', writeNumber);
