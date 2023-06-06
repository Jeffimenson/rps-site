// game(); 

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