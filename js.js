'use strict';
const message = $(`.message`),
    number = $(`.number`),
    score = $(`.score`),
    input = $(`.guess`),
    button = $(`.check`),
    againButton = $(`.again`),
    highScore = $(`.highscore`);


let background = $(`#background`);
let correctNumber;

function newNumber() {
    correctNumber = Math.floor(Math.random() * 20) + 1;
}

newNumber();

button.on('click', function () {
    checkNumber();
});

againButton.on('click', function () {
    reset();
    button.on('click', function () {
        checkNumber();
    });
});

function reset() {
    number.text('?');
    input.val('');
    score.text('20');
    message.text('Start guessing...');
    newNumber();
    background.css('background-color', '#222');
    number.css('width', '15rem');
    button.css('background-color', 'inherit')

}

function won() {
    const oldHighScore = highScore.text();
    if (Number(oldHighScore) < Number(score.text())) {
        highScore.text(Number(score.text()));
    }

    button.off();
    background.css('background-color', '#60b347');
    button.css('background-color', '#b1b1b1')
    number.css('width', '30rem');
}

function lost() {
    score.text(Number(score.text()) - 1);

    background.addClass('flash');

    setTimeout(function () {
        background.removeClass('flash');
    }, 600);

}

function checkNumber() {
    const inputNumber = input.val();

    // const correctNumber = 10;
    if (inputNumber < 0) {
        message.text('Number has to be above 0!');
    } else if (inputNumber > 20) {
        message.text('Number has to be below 20!');
    } else if (Number(inputNumber) > Number(correctNumber)) {
        message.text('📈 Number to high!');
        lost();
    } else if (Number(inputNumber) < Number(correctNumber)) {
        message.text('📉 Number to low!');
        lost();
    } else if (Number(inputNumber) === Number(correctNumber)) {
        message.text('✔ Correct Number!');
        number.text(correctNumber);
        won();
    } else {
        message.text('❌ Incorrect Number!');
        lost();
    }
}