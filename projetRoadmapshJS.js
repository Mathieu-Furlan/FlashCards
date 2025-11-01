function randomOrderQuestions(n){
    let alreadyUsed = new Set();
    let randomOrder = [];
    while(randomOrder.length < n){
        let randomlyGen = null;
        do{
            randomlyGen = Math.floor(Math.random() * n);
        }while(alreadyUsed.has(randomlyGen));
        alreadyUsed.add(randomlyGen);
        randomOrder.push(randomlyGen);
    }
    return randomOrder;
}

function prevQuest(){
    if(answerRevealed){
        btnAnswer.textContent = "Show Answer";
        answerRevealed = false;
    }
    if(currentIndex === questions.length){
        btnAnswer.disabled = false;
    }
    currentIndex--;
    if(currentIndex === questions.length - 1){
        btnN.disabled = false;
    }
    txtBox.textContent = questions[questionsOrder[currentIndex]][0];
    if(currentIndex === 0){
        btnPrev.disabled = true;
    }
    progressCursor--;
    currentQuestion--;
    let progressVal = Math.round((progressCursor / questions.length) * 100);
    progressBarWidth.style.width = `${progressVal}%`;
    progressBar.setAttribute("data-label", `${progressVal}% ${currentQuestion} of ${numberOfQuestions}`);
}

function nextQuest(){
    if(answerRevealed){
        btnAnswer.textContent = "Show Answer";
        answerRevealed = false;
    }
    currentIndex++;
    if(currentIndex === 1){
        btnPrev.disabled = false;
    }
    if(currentIndex === questions.length){
        txtBox.textContent = "End";
        btnN.disabled = true;
        btnAnswer.disabled = true;
    }
    else txtBox.textContent = questions[questionsOrder[currentIndex]][0];
    progressCursor++;
    if(currentQuestion < numberOfQuestions){
        currentQuestion++;
    }
    let progressVal = Math.round((progressCursor / questions.length) * 100);
    progressBarWidth.style.width = `${progressVal}%`;
    progressBar.setAttribute("data-label", `${progressVal}% ${currentQuestion} of ${numberOfQuestions}`);
}

function revealAns(){
    if(answerRevealed){
        txtBox.textContent = questions[questionsOrder[currentIndex]][0];
        btnAnswer.textContent = "Show Answer";
        answerRevealed = false;
    }
    else{
        txtBox.textContent = questions[questionsOrder[currentIndex]][1];
        btnAnswer.textContent = "Hide Answer";
        answerRevealed = true;
    }
}

let progressCursor = 0;
let questions = [["Which syllable is stressed in a two-syllable noun or adjective?", "The first one."], ["Which syllable is stressed in a two-syllable verb?", "The second one."], ["Which syllable is stressed in a word ending in -ic?", "The penultimate (second from end) one."], ["Which syllable is stressed in words ending in -sion or -tion?", "The penultimate (second from end) one."], ["Which syllable is stressed in words ending in -cy, -ty, -phy or -gy?", "The ante-penultimate (third from end) one."], ["Which syllable is stressed in words ending in -al?", "The ante-penultimate (third from end) one."], ["Which part is stressed in compound words (words with two parts) which are also nouns?", "The first part."], ["Which part is stressed in compound words (words with two parts) which are also adjectives?", "The second part."], ["Which part is stressed in compound words (words with two parts) which are also verbs?", "The second part."]];
let questionsOrder = randomOrderQuestions(questions.length);
let numberOfQuestions = questionsOrder.length;
let currentQuestion = 1;
let currentIndex = 0;
let btnPrev;
let btnN;
let txtBox;
let btnAnswer;
let answerRevealed = false;
let progressBar;
let progressBarWidth;

window.addEventListener("DOMContentLoaded", function(){
    progressBar = document.getElementsByClassName("progress")[0];
    progressBar.setAttribute("data-label", `0% 1 of ${numberOfQuestions}`);
    progressBarWidth = document.getElementsByClassName("value")[0];
    btnPrev = document.getElementById("btnPrevious");
    btnPrev.disabled = true;
    btnN = document.getElementById("btnNext");
    txtBox = document.getElementById("textBox");
    btnAnswer = this.document.getElementById("btnAns");
    txtBox.textContent = questions[questionsOrder[0]][0];
    btnPrev.addEventListener("click", prevQuest);
    btnN.addEventListener("click", nextQuest);
    btnAnswer.addEventListener("click", revealAns);
});