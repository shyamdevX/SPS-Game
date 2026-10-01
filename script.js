// Select HTML Elements
const choices = document.querySelectorAll(".choice");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const userScore = document.querySelector("#user-score");
const compScore = document.querySelector("#comp-score");
const msg = document.querySelector("#msg");

// Game Variables or Values
let userScoreValue = 0; let compScoreValue = 0;
let chances = 0;
const maxChances = 5;
 let gameStarted = false;
// Computer Choices
const choicesArray = ["rock", "paper", "scissors"];

// Disable choices initially

choices.forEach((choice) => {
    choice.style.pointerEvents="none";
});

// Start Button
startBtn.addEventListener("click", () =>{
    startGame();
});

// Start game function
function startGame (){
    gameStarted = true;

    userScoreValue = 0;
    compScoreValue = 0;
    chances = 0;

    userScore.textContent = "0";
    compScore.textContent = "0";

    // Enabble Choices

    choices.forEach((choice) => {
        choice.style.pointerEvents = "auto";
        choice.style.opacity = "1";
    });

    // Hide Start Button

    startBtn.classList.add("hidden");
    
    // Show Message

    showMessage("Choose Rock, Paper or Scissors!");
}

// Player Choice

        choices.forEach((choice) => {
            choice.addEventListener("click", () => {
                if(!gameStarted) {
                    return;
                }

                // Get player choice
                const userChoice = choice.id;

                // Comp randomly selects
                const randomIndex = Math.floor(Math.random() *choicesArray.length);
                const compChoice = choicesArray[randomIndex];

                // Increase round
                chances++;

                // Play round
                playRound(userChoice, compChoice);
            });
        });

        // Play Round

        function playRound(userChoice, compChoice){

            // Draw
            if(userChoice === compChoice) {
                showMessage(`Round ${chances}: Draw! Both choose Same ${userChoice.toUpperCase()}`);
            }

            // User Wins

            else if (
                (userChoice === "rock" && compChoice === "scissors") || 
                (userChoice === "paper" && compChoice === "rock") || 
                (userChoice === "scissors" && compChoice === "paper") 
            )
            {
                userScoreValue++;
                
                userScore.textContent = userScoreValue;
                
                showMessage(`Round ${chances}: You Win! ${userChoice.toUpperCase()} beats ${compChoice.toUpperCase()}`);
            }

            // Computer Wins 
            
            else {
                compScoreValue++;

                compScore.textContent = compScoreValue;

                showMessage(`Round ${chances}: Computer Wins! ${compChoice.toUpperCase()} beats ${userChoice.toUpperCase()}`);
         }

        //  Check 5 Chances

        if(chances === maxChances) {
            endGame ();
        }
    }
 
    // Show Message

    function showMessage(text) {
        msg.textContent = text;
        msg.classList.add("msg-show");
    }



    // End Game

    function endGame(){
        gameStarted = false;

        // Disable choices
        choices.forEach((choice) => {
            choice.style.pointerEvents = "none";
            choice.style.opacity = "0.5";
        });
   
        // Final Result

        if(userScoreValue > compScoreValue){
            showMessage(`Game Over! You are the Winner! ${userScoreValue} - ${compScoreValue}`);
            }
                else if (compScoreValue > userScoreValue) {
                showMessage(`Game Over! Computer Wins! ${compScoreValue} - ${userScoreValue}`);
                }
                else {
                    showMessage(`Game Over! It's a draw! ${userScoreValue} - ${compScoreValue}`);
            }


            // Restart Button

            resetBtn.addEventListener("click", ()=>{
                startGame();
            });
            
        }   
