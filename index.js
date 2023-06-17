const boxes = document.querySelectorAll(".box");
const gameStatus = document.querySelector("#gameStatus");
const startButton = document.querySelector("#startButton");

let emptyBoxes = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let continueGame = false;

letTheGameBegin();

function letTheGameBegin() {
    boxes.forEach((box) => box.addEventListener("click", boxClicked));
    startButton.addEventListener("click", restartGame);
    gameStatus.textContent = `${currentPlayer}'s Turn!`;
    continueGame = true;
}

function boxClicked() {
    const boxIndex = this.getAttribute("boxIndex");
    if (emptyBoxes[boxIndex] != "" || !continueGame) {
        return;
    }
    updateBox(this, boxIndex);
    checkWinner();
}

function updateBox(box, index) {
    box.textContent = currentPlayer;
    emptyBoxes[index] = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    gameStatus.textContent = `${currentPlayer}'s Turn!`;
}

function checkWinner() {
    let winningCombos = [];
    winningCombos.push(emptyBoxes[0] + emptyBoxes[1] + emptyBoxes[2]);
    winningCombos.push(emptyBoxes[3] + emptyBoxes[4] + emptyBoxes[5]);
    winningCombos.push(emptyBoxes[6] + emptyBoxes[7] + emptyBoxes[8]);
    winningCombos.push(emptyBoxes[0] + emptyBoxes[3] + emptyBoxes[6]);
    winningCombos.push(emptyBoxes[1] + emptyBoxes[4] + emptyBoxes[7]);
    winningCombos.push(emptyBoxes[2] + emptyBoxes[5] + emptyBoxes[8]);
    winningCombos.push(emptyBoxes[0] + emptyBoxes[4] + emptyBoxes[8]);
    winningCombos.push(emptyBoxes[2] + emptyBoxes[4] + emptyBoxes[6]);


if (winningCombos.includes("XXX")) {
    gameStatus.textContent = `X is the winner!`;
    continueGame = false;
    return;
} else if (winningCombos.includes("OOO")) {
    gameStatus.textContent = `O is the winner!`;
    continueGame = false;
    return;
} else if (!emptyBoxes.includes("")) {
    gameStatus.textContent = `Draw. Wa, Wa, Waaaaaa`;
    continueGame = false;
    return;
} else {
    changePlayer();
}
}

function restartGame() {
    currentPlayer = "X";
    emptyBoxes = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `${currentPlayer}'s Turn!`;
    boxes.forEach((box) => (box.textContent = ""));
    continueGame = true;
}