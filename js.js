'use strict';
const message = $(`.message`),
    number = $(`.number`),
    score = $(`.score`),
    input = $(`.guess`),
    button = $(`.check`),
    againButton = $(`.again`),
    highScore = $(`.highscore`),
    background = $(`#background`);

let correctNumber;

function newNumber() {
    correctNumber = Math.floor(Math.random() * 20) + 1;
}

newNumber();

button.on('click', () => checkNumber());

againButton.on('click', function () {
    reset();
    button.on('click', () => checkNumber());
});

function reset() {
    number.text('?');
    input.val('');
    score.text('20');
    message.text('Start guessing...');

    newNumber();

    background.css('background-color', '#222');
    number.css('width', '15rem');
    button.css('background-color', '#eee')

}

function won() {
    let scoreN = Number(score.text());

    if (Number(highScore.text()) < scoreN) {
        highScore.text(scoreN);
    }

    button.off();

    background.css('background-color', '#60b347');
    button.css('background-color', '#b1b1b1')
    number.css('width', '30rem');
}

function lost() {
    score.text(Number(score.text()) - 1);
    background.addClass('flash');

    setTimeout(() => background.removeClass('flash'), 600);
}

function checkNumber() {
    let inputNumber = Number(input.val());
    if (inputNumber === correctNumber) {
        message.text('✔ Correct Number!');
        number.text(correctNumber);
        won();
    } else if (inputNumber > 20) {
        message.text('Number has to be below 20!');
    } else if (inputNumber < 0) {
        message.text('Number has to be above 0!');
    } else if (score > 1) {
        if (inputNumber !== correctNumber) {
            message.text(inputNumber > correctNumber ? '📈 Number to high!' : '📉 Number to low!');
            lost();
        }
    } else {
        message.text('💥 You lost the game! STUPID');
        lost();
    }
}