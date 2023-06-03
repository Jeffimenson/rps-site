let wantsToPlay = true; 
while (wantsToPlay){
    let playerChoice = getPlayerChoice(); 
    let computerChoice = getComputerChoice(); 
    while (playerChoice === null){ 
        alert("That's not an option! >:("); 
        playerChoice = getPlayerChoice(); 
    }
    if (playerChoice === computerChoice){
        alert(`${playerChoice} vs. ${computerChoice}. It's a tie!`); 
    } else {
        let playerWon = determineWin(playerChoice, computerChoice); 
        if (playerWon){
            alert(`${playerChoice} beats ${computerChoice} - you won!`); 
        } else {
            alert(`${playerChoice} loses to ${computerChoice}... you lost! :(`); 
        }
    }
    
}


function getPlayerChoice(){
    let input = prompt("What do you choose - rock, paper, or scissors?"); 
    input = input.toUpperCase().trim(); 
    if (input === "ROCK" || input === "PAPER" || input === "SCISSORS"){
        return input;
    } else {
        return null; 
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