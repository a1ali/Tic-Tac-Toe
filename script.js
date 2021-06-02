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

    const screen = document.querySelector('.gamescreen');
    const gameovermodal = document.getElementById('game-over-modal-bg');
    const whowins = document.getElementById('whowins');
    const modalclose = document.getElementById('closeBtn');


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

    function checktie() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++){
                if (gameBoard.getGameArray(i, j) === ''){
                    return false;
                }
            }
        }
        return true;
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
        screen.addEventListener('click', (e) => {
         //only update if the position was previously empty
            if (e.target.innerText === '') {

                xStarts()
                updateGame(e.target.id, activePlayer.tag);
                if (checkwin(activePlayer.tag)){
                    whowins.innerText = `${activePlayer.tag} wins the game!`;
                    gameovermodal.style.display = 'flex';
                    //console.log(`${activePlayer.tag} wins`)
                    //restartGame();
                    activePlayer = playerO
                }
                if (checktie()) {
                    console.log('tie');
                    whowins.innerText = `It's a tie`;
                    gameovermodal.style.display = 'flex';
                } 
            }
        });
    }

    let restartBtn = document.getElementById("restartbtn");
    restartBtn.addEventListener('click', () => {
        restartGame();

        if (humanMode)
        {
            activePlayer = playerO;
        }
    })


    modalclose.addEventListener('click', () => {
        gameovermodal.style.display = 'none';
    })

    return {
        checkwin,
        restartGame,
        updateGame
    }

})();
