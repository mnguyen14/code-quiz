//global vars
var startQuizButton = document.getElementById("startbtn");
var quizComplete = document.getElementById("complete");
var timeInterval;
var quizPage = document.getElementById("quiz");
var score = 0;
var correct;
var currentQuestionIndex = 0;
var button1 = document.getElementById("1");
var button2 = document.getElementById("2");
var button3 = document.getElementById("3");
var button4 = document.getElementById("4");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("final-score");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var homePage = document.getElementById("homepage");
var highScoreContainer = document.getElementById("high-score-container");
var highScorePage = document.getElementById("high-score-page");
var nameInitials = document.getElementById("initials");
var hsInitials = document.getElementById("high-score-initials");
var submitScoreBtn = document.getElementById("submit-score");
var hScores = document.getElementById("high-scores");
var timeLeft = 60;

//questions for quiz
var quizQuestions = [
    {
        question: "Where and how do you link your Javascript file?",
        choice1: "In the HTML with a link tag.",
        choice2: "In the CSS with a script tag.",
        choice3: "In the HTML with a script tag.",
        choice4: "You don't have to.",
        correctChoice: "3"
    },
    {
        question: "Commonly used data types in Javascript DO NOT include:",
        choice1: "Numbers",
        choice2: "Strings",
        choice3: "Booleans",
        choice4: "Alerts",
        correctChoice: "4"
    },
    {
        question: "How can you access the local storage?",
        choice1: "Using the Inspect Element under the Application tab",
        choice2: "Using the Inspect Element under the Sources tab",
        choice3: "Using the Inspect Element under the Console tab",
        choice4: "Only the author of the website can",
        correctChoice: "1"
    },
    {
        question: "What numbers are included in the method Math.random()?",
        choice1: "All positive numbers",
        choice2: "All numbers from 0 to 1, not including 1",
        choice3: "0 and 1",
        choice4: "All numbers from 0 to 1",
        correctChoice: "2"
    },
    {
        question: "What is '&&' and what are the conditions to evaluate true?",
        choice1: "OR gate: true if at least on of the expressions are true",
        choice2: "AND gate: true if at lease one of the expressions are true",
        choice3: "AND gate: true if all expressions are true",
        choice4: "OR gate: true if all expressions are true",
        correctChoice: "3"
    },
    {
        question: "What will 'console.log('Hello world') log onto your console?",
        choice1: "Hello world",
        choice2: "string",
        choice3: "Hello + world",
        choice4: "There will be a syntax error",
        correctChoice: "1"
    }
];

//starts quiz
function startQuiz(){
    quizComplete.style.display = "none";
    startQuizButton.style.display = "none";
    generateQuizQuestion();

    timeInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timeInterval);
          showScore();
        }
    }, 1000);
    quizPage.style.display = "block";
}

//shows question and cycles them
function generateQuizQuestion(){
    quizComplete.style.display = "none";
    if (currentQuestionIndex === quizQuestions.length){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    button1.innerHTML = currentQuestion.choice1;
    button2.innerHTML = currentQuestion.choice2;
    button3.innerHTML = currentQuestion.choice3;
    button4.innerHTML = currentQuestion.choice4;
};

//tells user if answer is right and adds one to the score or wrong and subtracts 5 seconds
function questionAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctChoice;

    if (answer === correct && currentQuestionIndex !== quizQuestions.length){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== quizQuestions.length){
        alert("That Is Incorrect.")
        timeLeft -=  5
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    quizPage.style.display = "none";
    quizComplete.style.display = "flex";
    clearInterval(timeInterval);
    nameInitials.value = "";
    finalScoreEl.innerHTML = (score + "/6");
}

submitScoreBtn.addEventListener("click", function highScore(){
    
    
    if(nameInitials.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
        var currentUser = nameInitials.value.trim();
        var currentHighScore = {
            name : currentUser,
            score : score
        };
    
        quizComplete.style.display = "none";
        highScoreContainer.style.display = "flex";
        highScorePage.style.display = "block";
        
        savedHighScores.push(currentHighScore);
        localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores));
        generateHighScores();
    }    
});

function generateHighScores(){
    hsInitials.innerHTML = "";
    hScores.innerHTML = "";
    var highScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    for (i=0; i<highScores.length; i++){
        var listInitial = document.createElement("li");
        var listScore = document.createElement("li");
        listScore.classList.add("aside")
        listInitial.textContent = highScores[i].name;
        listScore.textContent = highScores[i].score;
        hsInitials.appendChild(listInitial);
        hScores.appendChild(listScore);
    }
}

function showHighScore(){
    homePage.style.display = "none"
    quizComplete.style.display = "none";
    highScoreContainer.style.display = "flex";
    highScorePage.style.display = "block";
    generateHighScores();
}

startQuizButton.addEventListener("click",startQuiz);