const choiceButtons = document.querySelectorAll('.choices button'); 
const statusText = document.querySelector('.status'); 
const playerModel = document.querySelector('.player .model'); 
const enemyModel = document.querySelector('.enemy .model'); 
const winsTracker = document.querySelector('.wins');
const lossesTracker = document.querySelector('.losses'); 
const comparator = document.querySelector('.comparator'); 

const overScreen = document.querySelector('.over-screen'); 
const overText = document.querySelector('.over-screen p');
const overButton = document.querySelector('.over-screen button');
const dimmer = document.querySelector('.dimmer');

let wins = 0; 
let losses = 0; 
initiateChoiceButtonFunctionalities(); 

function initiateChoiceButtonFunctionalities(){
    for (let i = 0; i < choiceButtons.length; i++){
        choiceButtons[i].addEventListener('click', () => {
            disableChoiceButtons(true); 
            const playerChoice = choiceButtons[i].getAttribute('data-choice');  
            playRound(playerChoice);             
        })
    }
}

function playRound(playerChoice){
    updateModel(playerModel, playerChoice); 
    statusText.textContent = `You chose ${playerChoice}`;

    const enemyChoice = getComputerChoice(); 
    setTimeout(() => {
        updateModel(enemyModel, enemyChoice); 
        statusText.textContent = `Enemy chose ${enemyChoice}`; 
        setTimeout(() => {
            updateStatsAndDisplayForWinner(playerChoice, enemyChoice); 
            updateStatsTracker(); 
            setTimeout(() => {
            playerModel.classList.remove(playerChoice); 
            playerModel.textContent = "?"; 
            enemyModel.classList.remove(enemyChoice); 
            enemyModel.textContent = "?"; 
            statusText.textContent = "Rock, Paper, or Scissors?"; 
            comparator.textContent = "vs."; 

            if (wins === 5 || losses === 5){
                activateGameOverScene();                   
            } else {
                disableChoiceButtons(false); 
            }
            }, 1000);
        }, 800);
    }, 500);
}

function activateGameOverScene(){
    overScreen.style.display = 'flex';
    dimmer.style.display = 'block'; 
    overText.textContent = (wins > losses) ? "You won! Play again?" : "You're a loser... Try again?"; 
}

overButton.addEventListener('click', () => {
    overScreen.style.display = 'none'; 
    dimmer.style.display = 'none'; 
    disableChoiceButtons(false); 
    wins = 0; 
    losses = 0; 
    updateStatsTracker(); 
}); 

function updateStatsTracker(){
    winsTracker.textContent = `Wins: ${wins}`; 
    lossesTracker.textContent = `Losses: ${losses}`; 
}

function updateStatsAndDisplayForWinner(playerChoice, enemyChoice){
    if(playerChoice===enemyChoice){
        comparator.textContent = "="; 
        statusText.textContent = 'Its a tie :/'; 
    } else {
        const won = determineWin(playerChoice, enemyChoice); 
        if (won){
            statusText.textContent = `${playerChoice} beats ${enemyChoice} - you won! :D`; 
            comparator.textContent = ">"; 
            wins++; 
        } else {
            statusText.textContent = `${playerChoice} loses to ${enemyChoice}... you lost :(`
            comparator.textContent = "<"; 
            losses++; 
        }
    }
}

function disableChoiceButtons(bool){
    for (const button of choiceButtons){
        button.disabled = bool; 
    }
}

function updateModel(model, choice){
    model.classList.add(choice); 
    model.textContent = ""; 
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