// query selectors
let wrapper = document.querySelector('#wrapper');
let dialog = document.querySelector('#dialog');
let dialogContent = document.querySelector('#dialog-content');
let overlay = document.querySelector('#overlay');
let clearBtn = document.querySelector('#clear-grid');
let editGridBtn = document.querySelector('#edit-grid');
/* let cancelBtn = document.querySelector('#dialog-cancel'); */
let okBtn = document.querySelector('#dialog-ok');

let rows = [];
let squares = [];

let dialogIsOpen = false;
let canType = true;

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
createGrid(100);


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

function clearSquares() {
    squares = squares.sort((a, b) => 0.5 - Math.random());
    
    var delayInMilliseconds = 1;

    squares.forEach(square => {
        setTimeout(function () {
            square.classList.remove('square-hover');
        }, delayInMilliseconds);
    });
}

function delayTyping() {
    canType = false;
    setTimeout(function () {
        canType = true;
    }, 200);
}

let outputNum = "";

/* dialogContent.textContent = outputNum;
dialogContent.classList.add("dialog-large-numbers");
createGrid(+outputNum);
randomizeSquares(); */

function openDialog() {
    dialogIsOpen = true;
    overlay.classList.remove('overlay-fade-out');
    overlay.classList.add('overlay-fade-in');
    dialog.classList.remove('dialog-fade-out');
    dialog.classList.add('dialog-fade-in');
}

function closeDialog() {
    console.log('CLOSING TIME');
    clearSquares();
    dialogIsOpen = false;
    overlay.classList.remove('overlay-fade-in');
    overlay.classList.add('overlay-fade-out');
    dialog.classList.remove('dialog-fade-in');
    dialog.classList.add('dialog-fade-out');
}

function enterClose(e) {
    if (e.key == "Enter" && dialogIsOpen == true) {
        closeDialog();
    }
}

// keypress events
document.addEventListener('keydown', enterClose);
clearBtn.addEventListener('click', clearSquares);
editGridBtn.addEventListener('click', openDialog);
/* cancelBtn.addEventListener('click', closeDialog); */
okBtn.addEventListener('click', closeDialog);
