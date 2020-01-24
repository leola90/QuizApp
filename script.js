var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var highScoreButton = document.getElementById('highscore-btn');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var timer = document.getElementById('time-btn');
var submitButton = document.getElementById('submit-btn');
var nameInput = document.getElementById('name'); 

let shuffledQuestions, currentQuestionIndex
let secondsLeft = questionEl.length * 15;
let scores = [];



startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})


function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove('hide');
  timer.classList.remove('hide');
  highScoreButton.classList.remove('hide');
  setTime();
  setNextQuestion(); 
} 

function setTime() {
    let timeLeft = 75;
    let downLoadTimer = setInterval(function() {
    document.getElementById('time-btn').innerHTML = timeLeft + " seconds remaining";
    timeLeft -= 1;
    if(timeLeft <= 0){
    clearInterval(downLoadTimer);
    document.getElementById("time-btn").innerHTML = "Finished"
    }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement ('button');
        button.innerText = answer.text;
        button.classList.add('btn');  
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsEl.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
    }
    else {
        startButton.innerText = ('restart');
        startButton.classList.remove('hide');
    }
}


function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    }
    else {
        element.classList.add('wrong');
    }
}

function clearStatusClass (element) {
    element.classList.remove('correct');
    element.classList.remove('Wrong');
}