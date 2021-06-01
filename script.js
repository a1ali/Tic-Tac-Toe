let humanMode = true;

const player = (tag) => {
    return {tag}
}

const gameBoard = (() => {
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');
    const box3 = document.getElementById('box3');
    const box4 = document.getElementById('box4');
    const box5 = document.getElementById('box5');
    const box6 = document.getElementById('box6');
    const box7 = document.getElementById('box7');
    const box8 = document.getElementById('box8');
    const box9 = document.getElementById('box9');

    let gameArray = [['', '', ''], ['', '', ''], ['', '', '']]; //3X3 array

    function renderBoard() {
        box1.innerText = gameArray[0][0];
        box2.innerText = gameArray[0][1];
        box3.innerText = gameArray[0][2];
        box4.innerText = gameArray[1][0];
        box5.innerText = gameArray[1][1];
        box6.innerText = gameArray[1][2];
        box7.innerText = gameArray[2][0];
        box8.innerText = gameArray[2][1];
        box9.innerText = gameArray[2][2];
    }

    function updateGameArray(position, player) {
        switch(position) {
            case 'box1':   
                //only update position if position is empty
                gameArray[0][0] = (gameArray[0][0] === '') ? player: gameArray[0][0];
                break;

            case 'box2':
                gameArray[0][1] = (gameArray[0][1] === '') ? player: gameArray[0][1];
                break;

            case 'box3':
                gameArray[0][2] = (gameArray[0][2] === '') ? player: gameArray[0][2];
                break;

            case 'box4':
                gameArray[1][0] = (gameArray[1][0] === '') ? player: gameArray[1][0];
                break;

            case 'box5':
                gameArray[1][1] = (gameArray[1][1] === '') ? player: gameArray[1][1];
                break;

            case 'box6':
                gameArray[1][2] = (gameArray[1][2] === '') ? player: gameArray[1][2];
                break;

            case 'box7':
                gameArray[2][0] = (gameArray[2][0] === '') ? player: gameArray[2][0];
                break;

            case 'box8':
                gameArray[2][1] = (gameArray[2][1] === '') ? player: gameArray[2][1];
                break;

            case 'box9':
                gameArray[2][2] = (gameArray[2][2] === '') ? player: gameArray[2][2];
                break;
        }

    }
    
    function resetGameArray() {
        gameArray = [['', '', ''], ['', '', ''], ['', '', '']];
    }

    function getGameArray(p1, p2) {
        return gameArray[p1][p2];
    }


    return {
        updateGameArray,
        resetGameArray,
        renderBoard,
        getGameArray,
    }

})();

const game = (() => {

    function checkwin(player) {
        if (//horizontal wins
            gameBoard.getGameArray(0,0) === player && gameBoard.getGameArray(0,1) === player && gameBoard.getGameArray(0,2) === player ||
            gameBoard.getGameArray(1,0) === player && gameBoard.getGameArray(1,1) === player && gameBoard.getGameArray(1,2) === player ||
            gameBoard.getGameArray(2,0) === player && gameBoard.getGameArray(2,1) === player && gameBoard.getGameArray(2,2) === player ||
            //vertical wins
            gameBoard.getGameArray(0,0) === player && gameBoard.getGameArray(1,0) === player && gameBoard.getGameArray(2,0) === player ||
            gameBoard.getGameArray(0,1) === player && gameBoard.getGameArray(1,1) === player && gameBoard.getGameArray(2,1) === player ||
            gameBoard.getGameArray(0,2) === player && gameBoard.getGameArray(1,2) === player && gameBoard.getGameArray(2,2) === player ||
            //diagonal wins
            gameBoard.getGameArray(0,0) === player && gameBoard.getGameArray(1,1) === player && gameBoard.getGameArray(2,2) === player ||
            gameBoard.getGameArray(0,2) === player && gameBoard.getGameArray(1,1) === player && gameBoard.getGameArray(2,0) === player
            ) 

            {
                return true;
            }
        
        return false;
    }


    function restartGame() {
        gameBoard.resetGameArray();
        gameBoard.renderBoard();
    }

    function updateGame(position, player) {
        gameBoard.updateGameArray(position, player);
        gameBoard.renderBoard();
    }


    let playerX = player('X');
    let playerO = player('O');
    let activePlayer = playerO;

    function xStarts() {

        if (activePlayer === playerO) {
            activePlayer = playerX;
        }

        else {
            activePlayer = playerO;
        }
    }


    if (humanMode) {

        let screen = document.querySelector('.gamescreen');
    
        screen.addEventListener('click', (e) => {
            xStarts()
            game.updateGame(e.target.id, activePlayer.tag);
            if (game.checkwin(activePlayer.tag)){
                console.log(`${activePlayer.tag} wins`)
                game.restartGame();
                activePlayer = playerO
    
            }
        });

    }

    let restartBtn = document.getElementById("restartbtn");
    restartBtn.addEventListener('click', () => {
        game.restartGame();

        if (humanMode)
        {
            activePlayer = playerO;
        }
    })


    return {
        checkwin,
        restartGame,
        updateGame
    }

})();



/*
let playerX = player('X');
let playerO = player('O');

let activePlayer = playerO;


let screen = document.querySelector('.gamescreen');

screen.addEventListener('click', (e) => {
    if (activePlayer === playerO) {
        activePlayer = playerX;
    }

    else {
        activePlayer = playerO;
    }

    game.updateGame(e.target.id, activePlayer.tag);
    if (game.checkwin(activePlayer.tag)){
        console.log(`${activePlayer.tag} wins`)
        game.restartGame();
        activePlayer = playerO
        
    }


});


let restartBtn = document.getElementById("restartbtn");
restartBtn.addEventListener('click', () => {
    game.restartGame();
    activePlayer = playerO;
})

*/