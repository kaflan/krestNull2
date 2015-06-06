/* global getWinner */
var game = null;

window.addEventListener('load', function load() {
  'use strict';
  var nextClass;// хранить класс правильний по кліку фраєра змінюєця поточний клас сім матерів бабі в цицьку
  var i;
  var j;
  var winner;
  var winnerEl = document.querySelector('.winner-message');
  var startNewGame = document.querySelector('.startNewGame');
  var generateField = document.querySelector('.generateField');
  var errMessage = document.querySelector('.error-message');
  var count = document.querySelector('.count');
  var field = document.querySelector('.field');
  var mainGame = document.querySelector('.mainGame');
  var startGame = document.querySelector('.startGame');
  var createDiv = function () {
    return document.createElement('div');
  };//function create div
  var addRowClass = function (div) {
    div.classList.add('row');
  }; // add class to div
  var addCellClass = function (div) {
    div.classList.add('cell');
  };

  var saveState = function () {
    localStorage.setItem('game', JSON.stringify(game));
  };
  var loadState = function () {
    game = JSON.parse(localStorage.getItem('game'));
  };

  var createFields = function () {
    var inputVal = count.value;
    var size = +inputVal;
    if (isNaN(size) || size < 5 || size > 15) {
      errMessage.innerHTML = 'Вы ввели некорректное число';
      return;
    }
    game = {
      state: [],
      size: size
    };
    drawField();
  }; // create fields
  var clickEvent = function (event) {
    event.preventDefault();
    if ((event.target.classList.contains('x') || event.target.classList.contains('o'))) {
      return;
    }
    if ((!event.target.classList.contains('cell'))) {
      return;
    }
    if (getWinner()){
      return;
    }
    if (nextClass === 'x') {
      nextClass = 'o';
    } else {
      // міняєм класс на "о"
      nextClass = 'x'; // міша зливай воду  міняїм на "х"
    }
    event.target.classList.add(nextClass);
    game.state[event.target.attributes["data-index"]] = nextClass;
    saveState();
    winner = getWinner();
    if (winner) {
      if (winner === 'x') {
        winnerEl.innerHTML = 'Крестик победил';
        field.removeEventListener('click', clickEvent);
      }
      else if (winner === 'o') {
        winnerEl.innerHTML = 'Нолик победил';
        field.removeEventListener('click', clickEvent);
      }
    }
  };
  var drawField = function () {
    for (i = 0; i < game.size; i++) {
      var divRow = createDiv();
      addRowClass(divRow);
      field.appendChild(divRow);
      for (j = 0; j < game.size; j++) {
        var divCell = createDiv();
        addCellClass(divCell);
        var pos = i + j * game.size;
        var curCellState = game.state[pos];
        if (curCellState === 'x') {
          divCell.classList.add('x');
        }
        else if (curCellState === 'o') {
          divCell.classList.add('o');
        }
        divCell.attributes["data-index"] = '' + pos;
        divRow.appendChild(divCell);
        divCell.addEventListener('click', clickEvent);
      }
    }
    mainGame.style.display = 'inline-block';
    startGame.style.display = 'none';
  };
  loadState();
  if (game !== null) {
    drawField();
  }
  var clickNewGame = function () {
    field.innerHTML = '';
    winnerEl.innerHTML = '';
    mainGame.style.display = 'none';
    startGame.style.display = 'inline-block';
    localStorage.clear();
  }; // start to new game click
  field.addEventListener('click', clickEvent);
  startNewGame.addEventListener('click', clickNewGame);
  generateField.addEventListener('click', createFields);
  count.addEventListener('keyup', function (event) {
    if (event.keyCode !== 13) return;
    createFields();
  }); //keyup generete fields
});
