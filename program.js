const choiceButtons = document.querySelectorAll('.choices button'); 
const statusText = document.querySelector('.status'); 
const playerModel = document.querySelector('.player .model'); 
const enemyModel = document.querySelector('.enemy .model'); 
const winsTracker = document.querySelector('.wins');
const lossesTracker = document.querySelector('.losses'); 

let wins = 0; 
let losses = 0; 

for (let i = 0; i < choiceButtons.length; i++){
    choiceButtons[i].addEventListener('click', () => {
        const playerChoice = choiceButtons[i].getAttribute('data-choice');  
        updateModel(playerModel, playerChoice); 
        statusText.textContent = `You chose ${playerChoice}`;

        const enemyChoice = getComputerChoice(); 
        setTimeout(() => {
            updateModel(enemyModel, enemyChoice); 
            statusText.textContent = `Enemy chose ${enemyChoice}`; 
            setTimeout(() => {
                updateForWinner(playerChoice, enemyChoice); 
                setTimeout(() => {
                    
                }, 1000)
            }, 1000)
        }, 1000)        
    })
}

function updateStatsTracker(){
    winsTracker.textContent = `Wins: ${wins}`; 
    lossesTracker.textContent = `Losses: ${losses}`; 
}

function updateForWinner(playerChoice, enemyChoice){
    if(playerChoice===enemyChoice){
        statusText.textContent = 'Its a tie :/'; 
    } else {
        const won = determineWin(playerChoice, enemyChoice); 
        if (won){
            statusText.textContent = `${playerChoice} beats ${enemyChoice} - you won! :D`; 
            wins++; 
        } else {
            statusText.textContent = `${playerChoice} loses to ${enemyChoice}... you lost :(`
            losses++; 
        }
    }
}


function updateModel(model, choice){
    model.classList.add(choice); 
    model.textContent = ""; 
}




//Old stuff below
function game(){
    let rounds = 0; 
    let wins = 0; 

    while (true){
        let playerChoice = getPlayerChoice(); 
        let computerChoice = getComputerChoice(); 
        
        while (playerChoice === ""){ 
            alert("That's not an option! >:("); 
            playerChoice = getPlayerChoice(); 
        }
        if (playerChoice === null){
            alert(`Ending game. You won ${wins} out of ${rounds} rounds.`); 
            break; 
        }
        rounds++; 
        if (playRound(playerChoice, computerChoice)){
            wins++; 
        }
    }
}

function playRound(playerChoice, computerChoice){
    if (playerChoice === computerChoice){
        alert(`${playerChoice} vs. ${computerChoice}. It's a tie!`);
    } else {
        let playerWon = determineWin(playerChoice, computerChoice); 
        if (playerWon){
            alert(`${playerChoice} beats ${computerChoice} - you won!`); 
            return true; 
        } else {
            alert(`${playerChoice} loses to ${computerChoice}... you lost! :(`); 
            return false; 
        }
    }
}

function getPlayerChoice(){
    let input = prompt("What do you choose - rock, paper, or scissors?"); 
    if (input === null)
        return null; 
    input = input.toUpperCase(); 
    input = input.trim(); 
    if (input === "ROCK" || input === "PAPER" || input === "SCISSORS"){
        return input;
    } else {
        return ""; 
    }
}

function getComputerChoice(){
    let choices = ["ROCK", "PAPER", "SCISSORS"]; 
    let randomIndex = Math.floor((Math.random()*3));
    return choices[randomIndex];
}

function determineWin(playerChoice, computerChoice){
    if (playerChoice === "ROCK"){
        return computerChoice === "SCISSORS";  
    } 
    if (playerChoice === "PAPER"){
        return computerChoice === "ROCK";
    }
    if (playerChoice === "SCISSORS"){
        return computerChoice === "PAPER"; 
    }
}