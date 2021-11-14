// TODO: rainbow color mode toggle
// TODO: trace history button (store one, in order - button to replay? replay mode?)

// query selectors
let wrapper = document.querySelector('#wrapper');
let clearBtn = document.querySelector('#clear-grid');
let editGridBtn = document.querySelector('#edit-grid');
let overlay = document.querySelector('#overlay');
let dialog = document.querySelector('#dialog');
let dialogContent = document.querySelector('#dialog-content');
let dialogStatus = document.querySelector('#dialog-status-text');
let slider = document.querySelector('#dialog-range-slider');
let okBtn = document.querySelector('#dialog-ok');
let cancelBtn = document.querySelector('#dialog-cancel');
let rainbowSwitch = document.querySelector('#rainbow-switch');

let rows = [];
let squares = [];

let dialogIsOpen = false;
let resolution = 50;

let currentHue = 0;
let rainbowModeIsToggled = false;


function hoverSquare() {
    //this.classList.add('square-hover');
    this.style.backgroundColor = `hsla(${currentHue}, 100%, 50%, 1)`;
    if (currentHue < 360) {
        currentHue += 1;
    } else {
        currentHue = 0;
    }
}

function createGrid(newResolution) {
    wrapper.innerHTML = '';
    for (let i = 0; i < newResolution; i++) {

        // creates rows
        let row = document.createElement('div');
        row.className = 'row';
        wrapper.appendChild(row);
        rows.push(row);
    
        // creates squares for each row
        for (let j = 0; j < newResolution; j++) {
            let square = document.createElement('div');
            square.className = 'square';
            row.appendChild(square);
            squares.push(square);
    
            // listens to hover on the squares
            square.addEventListener('mouseover', hoverSquare);
        }
    }
    resolution = newResolution;
}
createGrid(resolution);


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


function openDialog() {
    dialogIsOpen = true;
    slider.value = resolution;
    dialogStatus.textContent = resolution;
    overlay.classList.remove('overlay-fade-out');
    overlay.classList.add('overlay-fade-in');
    dialog.classList.remove('dialog-fade-out');
    dialog.classList.add('dialog-fade-in');
}


function closeDialog() {
    clearSquares();
    dialogIsOpen = false;
    overlay.classList.remove('overlay-fade-in');
    overlay.classList.add('overlay-fade-out');
    dialog.classList.remove('dialog-fade-in');
    dialog.classList.add('dialog-fade-out');
}

function cancelDialog() {
    dialogIsOpen = false;
    overlay.classList.remove('overlay-fade-in');
    overlay.classList.add('overlay-fade-out');
    dialog.classList.remove('dialog-fade-in');
    dialog.classList.add('dialog-fade-out');
}


function pressEnterToClose(e) {
    if (e.key == "Enter" && dialogIsOpen == true) {
        closeDialog();
    }
}


function onSliderMove(e) {
    dialogStatus.textContent = e.srcElement.valueAsNumber;
}


function onSliderRelease(e) {
    createGrid(e.srcElement.value);
    randomizeSquares();
}

function toggleRainbowMode() {
    if (this.checked == true) {
        rainbowModeIsToggled = true;
    } else {
        rainbowModeIsToggled = false;
    }
    console.log(rainbowModeIsToggled);
}


// keypress events
document.addEventListener('keydown', pressEnterToClose);
clearBtn.addEventListener('click', clearSquares);
editGridBtn.addEventListener('click', openDialog);
slider.addEventListener('input', onSliderMove);
slider.addEventListener('change', onSliderRelease);
okBtn.addEventListener('click', closeDialog);
cancelBtn.addEventListener('click', cancelDialog);
rainbowSwitch.addEventListener('change', toggleRainbowMode);
