/* global getWinner */
var game = {
  position: [],
  size: null
}; // local storage
var loadState = localStorage.getItem('game');
if (loadState) {
  game = JSON.parse(loadState);
}
window.addEventListener('load', function load() {
  'use strict';
  var cellAll; // у массіві всі наші класси целл
  var nextClass;// хранить класс правильний по кліку фраєра змінюєця поточний клас сім матерів бабі в цицьку
  var i;
  var j;
  var winner;
  var inputVal;
  var size = game.size;
  var field = document.querySelector('.field');
  var winnerEl = document.querySelector('.winner-message');
  var startNewGame = document.querySelector('.startNewGame');
  var startGame = document.querySelector('.startGame');
  var generateField = document.querySelector('.generateField');
  var errMessage = document.querySelector('.error-message');
  var mainGame = document.querySelector('.mainGame');
  var count = document.querySelector('.count');
  var createDiv = function () {
    return document.createElement('div');
  };//function create div
  var addRowClass = function (div) {
    div.classList.add('row');
  }; // add class to div
  var addCellClass = function (div) {
    div.classList.add('cell');
  };// add class to div
  var clickEvent = function (event) {
    event.preventDefault();
    if ((event.target.classList.contains('x') || event.target.classList.contains('o'))) {
      return;
    }
    if ((!event.target.classList.contains('cell') || event.target.classList.contains('field'))) {
      return;
    }
    if (nextClass === 'x') {
      nextClass = 'o';
    } else {
      // міняєм класс на "о"
      nextClass = 'x'; // міша зливай воду  міняїм на "х"
    }
    event.target.classList.add(nextClass);
    winner = getWinner();
    if (winner === 'x') {
      winnerEl.innerHTML = 'Крестик победил';
      field.removeEventListener('click', clickEvent);
    } else if (winner === 'o') {
      winnerEl.innerHTML = 'Нолик победил';
      field.removeEventListener('click', clickEvent);
    }
  }; // click to event x o;
  var clickNewGame = function (e) {
    e.preventDefault();
    mainGame.style.display = 'none';
    startGame.style.display = 'inline-block';
    cellAll = document.querySelectorAll('.cell');
    nextClass = '';
    winnerEl.innerHTML = '';
    field.addEventListener('click', clickEvent);
  }; // start to new game click
  var createFields = function () {
    //if(game.size[0]) {
    //  size = +game.size[0];
    //}
    localStorage.clear();
    inputVal = count.value;
    size = +inputVal;
    field.innerHTML = '';
    if (isNaN(size) || size < 5 || size > 15) {
      errMessage.innerHTML = 'Вы ввели некорректное число';
      return;
    }
    mainGame.style.display = 'inline-block';
    startGame.style.display = 'none';
    console.log(size);
    game.size = size;
    for (i = 0; i < size; i++) {
      var divRow = createDiv();
      addRowClass(divRow);
      field.appendChild(divRow);
      for (j = 0; j < size; j++) {
        var divCell = createDiv();
        addCellClass(divCell);
        divRow.appendChild(divCell);
      }
    }
    saveState();
  }; // create fields
  var saveState = function () {
    localStorage.setItem('game', JSON.stringify(game));
  };
  if (game.size){
    count.value = game.size;
    return createFields();
  }
  console.log(game.size);
  startNewGame.addEventListener('click', clickNewGame);
  generateField.addEventListener('click', createFields);
  count.addEventListener('keyup', function (event) {
    if (event.keyCode !== 13) return;
    createFields();
  }); //keyup generete fields
});
