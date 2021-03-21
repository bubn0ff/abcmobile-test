var infoMain = document.querySelector('.quiz-info');
var infoArea = document.querySelector('.quiz-info__title');
var quiz = document.querySelector('.quiz-main');
var questionArea = document.querySelector('.quiz-main__questions');
var answerArea = document.querySelector('.quiz-main__answers');
var footer = document.querySelector('.quiz-main__footer_text');
var count1 = document.querySelector('.quiz-main__footer_text span');
var quizEnd = document.querySelector('.quiz-end');
var quizButton = document.querySelector('.quiz-end__call_btn');
var current = 0;

// В массиве последняя цифра даёт правильную позицию ответа 
var allQuestions = {
  'Боитесь ли вы умереть?': ['Да', 'Нет', 0],
  'Когда Вы чувствуете себя наиболее комфортно?': ['Утро', 'День', 'Вечер', 'Ночь', 0],
  'Укажите свою дату рождения:': ['День', 'Месяц', 'Год', 'Далее', 0],
  'Снятся ли Вам умершие люди?': ['Да', 'Нет', 'Иногда', 0],
  'Запись, которую Вы услышите, может шокировать людей с неокрепшей психикой. Вы готовы узнать, что ждет именно Вас?': ['Да', 'Затрудняюсь ответить', 0],
};

var allInfo = [
  '', 
  'Мы расскажем Вам не только подробности вашей смерти, но также поможем Вам избежать этой ужасной даты и продлить вашу жизнь на многие годы.', 
  'Уже совсем скоро Вы узнаете много интересного о своем будущем!', 
  'Смерть родного человека – одно из тяжелейших испытаний в жизни каждого из нас!',
  'По вам скучает очень близкий человек, которого больше нет в мире живых.'
];

// Функция загружает дополнительную информацию в область infoArea
function loadInfo(curr) {  
  if (typeof allInfo !== "undefined") {
    var info = allInfo[curr];
    if (info !== "") {
      infoMain.style.display = 'block';
      infoArea.innerText = info;
    }
  } else {
    console.error('Массив allInfo не обнаружен!');
  }
}

// Функция загружает все вопросы в область questionArea 
// Получает текущий вопрос на основе переменной 'current'.
function loadQuestion(curr) {
  if (typeof allQuestions !== "undefined") {
    var question = Object.keys(allQuestions)[curr];
    questionArea.innerText = '';
    questionArea.innerText = question;
  } else {
    questionArea.innerText = '';
    footer.innerText = '';
    console.error('Массив allQuestions не обнаружен!');
  }
}

// Функция загружает все ответы на заданный вопрос - в область answerArea.
// Загружает необходимый массив ответов на основе переменной 'current'.
function loadAnswers(curr) {
  if (typeof allQuestions !== "undefined") {
    var answers = allQuestions[Object.keys(allQuestions)[curr]];
    answerArea.innerText = '';

    for (var i = 0; i < answers.length - 1; i += 1) {
      var button = document.createElement('button');
      button.className = 'quiz__button';
      button.innerText = answers[i];
      button.addEventListener("click", loadData(i, answers));
      answerArea.appendChild(button);
    }
  } else {
    answerArea.innerText = '';
    footer.innerText = '';
    console.error('Массив allQuestions не обнаружен!');
  }
}

// Функция, которая запускается при нажатии на один из ответов.
function loadData(i, arr) {
  return function() {
    if (current < Object.keys(allQuestions).length - 1) {
      current += 1;
      loadInfo(current);
      loadQuestion(current);
      loadAnswers(current);
      count1.innerText = current + 1;
    } else {
      infoMain.style.display = 'none';
      quiz.style.display = 'none';
      quizEnd.style.display = 'block';
      footer.removeChild(count1);
      footer.innerText = '';
    }                
  };
}

function xhrIE() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://swapi.dev/api/people/1/');
  xhr.send();
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('IE, ошибка ', xhr.status, ':', xhr.statusText);
    } else {
      console.log(xhr.response);
    }
  };    
  xhr.onerror = function() {
    console.log('IE, запрос не удался!');
  };
}

window.addEventListener('DOMContentLoaded', function() {
  loadInfo(current);
  loadQuestion(current);
  loadAnswers(current);
})

quizButton.addEventListener('click', function() {
  xhrIE();
})