// obiect, which have data game
const gameScore = {
    countGame: 0,
    win: 0,
    loss: 0,
    draw: 0,
}

const gameSelect = {
    aiHand: "",
    playerHand: "",
}

// variables
const btnStart = document.querySelector('.select button');
const hands = [...document.querySelectorAll('.fas')];

// Get hand
const selectHand = (e) => {
    gameSelect.playerHand = e.currentTarget.dataset.option;
    gameSelect.aiHand = hands[Math.floor(Math.random() * hands.length)].dataset.option;
    document.querySelector('[data-summary="your-choice"]').textContent = gameSelect.playerHand;

    // active element
    hands.forEach(hand => hand.style.color = '#000');
    e.target.style.color = "#ffe135";
}

// Check result game
const checkResult = () => {
    if (gameSelect.playerHand === "" ) {
        alert('Wybierz dłoń!');
        return;
    } else {
        gameScore.countGame++;
        if (gameSelect.playerHand === gameSelect.aiHand) {
            gameScore.draw++;
            return 'draws';
        } else if (gameSelect.playerHand === 'Papier' && gameSelect.aiHand === 'Kamień' || gameSelect.playerHand === 'Kamień' && gameSelect.aiHand === 'Nożyczki' || gameSelect.playerHand === 'Nożyczki' && gameSelect.aiHand === 'Papier') {
            gameScore.win++;
            return 'win';
        } else {
            gameScore.loss++;
            return 'loss';
        }
    }
}

// public result to html
const publicResult = (resultGame) => {
    const whoWin = document.querySelector('[data-summary="who-win"]');
    document.querySelector('.numbers span').textContent = gameScore.countGame;
    document.querySelector('.wins span').textContent = gameScore.win;
    document.querySelector('.losses span').textContent = gameScore.loss;
    document.querySelector('.draws span').textContent =  gameScore.draw;

    if(resultGame === "win") {
        whoWin.textContent = "Wygrałeś!!"
        whoWin.style.color = "green";
    } else if (resultGame === "loss") {
        whoWin.textContent = "Przegrałeś..."
        whoWin.style.color = "red";
    } else {
        whoWin.textContent = "Remis ;) "
        whoWin.style.color = "gray";
    }

    gameSelect.playerHand = "";
}

// control function
const startGame = () => {
    const resultGame = checkResult();
    hands.forEach(hand => hand.style.color = '#000');
    document.querySelector('[data-summary="ai-choice"]').textContent = gameSelect.aiHand;

    publicResult(resultGame);
}

// events
btnStart.addEventListener('click', startGame);
hands.forEach(hand => hand.addEventListener('click', selectHand));
