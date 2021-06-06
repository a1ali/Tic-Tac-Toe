let humanMode = false;
let computerMode = false;

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

    function getBox(pos) {
        let posToBox = {
            '00': 'box1',
            '01': 'box2',
            '02': 'box3',
            '10': 'box4',
            '11': 'box5',
            '12': 'box6',
            '20': 'box7',
            '21': 'box8',
            '22': 'box9',
        }

        return posToBox[pos];
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
        getBox,
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

    let gameOver = false;
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

    function doChecking(activePlayer) {
        if (checkwin(activePlayer.tag) && gameOver === false){
            whowins.innerText = `${activePlayer.tag} wins the game!`;
            gameovermodal.style.display = 'flex';
            gameOver = true;
        } 
        if (checktie() && gameOver === false) {
            whowins.innerText = `It's a tie`;
            gameovermodal.style.display = 'flex';
            gameOver = true;
        }   
    }

 /*
    if (humanMode) {
        screen.addEventListener('click', (e) => {
         //only update if the position is empty
            if (e.target.innerText === '' && gameOver === false) {
                xStarts() //swaps active player
                updateGame(e.target.id, activePlayer.tag);
                doChecking(activePlayer)
            }
        });
    }

    else if (computerMode) {

        screen.addEventListener('click', (e) => {
            //only update if the position is empty
               if (e.target.innerText === '' && gameOver === false) {
   
                    //xStarts - human
                    activePlayer = playerX
                    if (gameOver === false) {
                        updateGame(e.target.id, activePlayer.tag);
                    }
                    doChecking(activePlayer);

                    //computer turn
                    activePlayer = playerO;
                    if (gameOver === false) {
                        updateGame(getRandomEmptySpace(), activePlayer.tag);
                    }
                    doChecking(activePlayer)

                    activePlayer = playerX;
               }
           });
    }

     */



    screen.addEventListener('click', (e) => {
        //only update if the position is empty
           if (e.target.innerText === '' && gameOver === false) {

                if (humanMode) {  
                    xStarts() //swaps active player
                    updateGame(e.target.id, activePlayer.tag);
                    doChecking(activePlayer)
                }

                else if (computerMode) {
                    //xStarts - human
                    activePlayer = playerX
                    if (gameOver === false) {
                        updateGame(e.target.id, activePlayer.tag);
                    }
                    doChecking(activePlayer);

                    //computer turn
                    activePlayer = playerO;
                    if (gameOver === false) {
                        updateGame(getRandomEmptySpace(), activePlayer.tag);
                    }
                    doChecking(activePlayer)

                    activePlayer = playerX;
                }
           }
       });

    function getRandomEmptySpace(){
        let emptySpace = false;
        let box = null;

        while(emptySpace === false) {
            let x = Math.floor(Math.random() * 3);
            let y = Math.floor(Math.random() * 3);
            let pos = gameBoard.getGameArray(x,y)
            console.log(pos)
            if (pos === '') {
                emptySpace = true;
                box = gameBoard.getBox(`${x}${y}`)
            }
            console.log('trying to find a space')
        }

        return box;

    }

    let restartBtn = document.getElementById("restartbtn");
    restartBtn.addEventListener('click', () => {
        restartGame();

        if (humanMode)
        {
            activePlayer = playerO;
        }
        gameOver = false;

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

let gameStartModal = document.querySelector('.game-start-modal')
let gameScreenContainer = document.querySelector('.container')
let humanModeSelector = document.getElementById('humanMode');
let computerModeSelector = document.getElementById('computerMode');

humanModeSelector.addEventListener('click', () => {
    humanMode = true;
    gameStartModal.style.transition = '0.8s';
    gameStartModal.style.opacity = 0;
    gameStartModal.style.display = 'none';
    gameScreenContainer.style.display = 'grid';

})

computerModeSelector.addEventListener('click', () => {
    computerMode = true;
    gameStartModal.style.transition = '0.8s';
    gameStartModal.style.opacity = 0;
    gameStartModal.style.display = 'none';
    gameScreenContainer.style.display = 'grid';
})
