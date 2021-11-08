let wrapper = document.querySelector('#wrapper');

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
