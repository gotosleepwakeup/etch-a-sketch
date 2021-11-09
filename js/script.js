// query selectors
let wrapper = document.querySelector('#wrapper');
let dialogContent = document.querySelector('#dialog-content');

function hoverSquare() {
    this.classList.add('square-hover');
}

for (let i = 0; i < 16; i++) {

    // creates 16 rows
    let row = document.createElement('div');
    row.className = 'row';
    wrapper.appendChild(row);

    // creates 16 squares for each row
    for (let j = 0; j < 16; j++) {
        let square = document.createElement('div');
        square.className = 'square';
        row.appendChild(square);

        // listens to hover on the squares
        square.addEventListener('mouseover', hoverSquare);
    }
}

let outputNum = "";
function writeNumber(e) {
    // TODO: maximum 100
    // TODO: no leading 0's
    // TODO: animate numbers in
    // TODO: backspace to remove a number
    // TODO: flashy animation on grid as a preview of grid size
    let inputNum = +e.key;

    if (outputNum.length == 0 && inputNum == 0) {
        return;
    }

    if (inputNum >= 0 && inputNum <= 9) {
        
            if (outputNum.length < 3) {
                outputNum = outputNum + e.key;
                dialogContent.textContent = outputNum;
                dialogContent.classList.add("dialog-large-numbers");
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
