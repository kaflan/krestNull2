/* global getWinner */
var game = null;

window.addEventListener('load', function load() {
  'use strict';
  var nextClass;// хранить класс правильний по кліку фраєра змінюєця поточний клас сім матерів бабі в цицьку
  var i;
  var message = '';
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
  var divRow;
  var divCell;
  var pos;
  var curCellState;

  function createDiv() {
    return document.createElement('div');
  } // function create div
  function addRowClass(div) {
    div.classList.add('row');
  } // add class to div
  function addCellClass(div) {
    div.classList.add('cell');
  }

  function saveState() {
    localStorage.setItem('game', JSON.stringify(game));
  }

  function loadState() {
    game = JSON.parse(localStorage.getItem('game'));
  }

  function win() {
    winner = getWinner();
    if (winner) {
      if (winner === 'x') {
        message = 'Крестик победил';
      }
      if (winner === 'o') {
        message = 'Нолик победил';
      }
      return message;
    }
    return message;
  }

  function drawField() {
    for (i = 0; i < game.size; i++) {
      divRow = createDiv();
      addRowClass(divRow);
      field.appendChild(divRow);
      for (j = 0; j < game.size; j++) {
        divCell = createDiv();
        addCellClass(divCell);
        pos = i + j * game.size;
        curCellState = game.state[pos];
        if (curCellState === 'x') {
          divCell.classList.add('x');
        }
        if (curCellState === 'o') {
          divCell.classList.add('o');
        }
        divCell.attributes['data-index'] = '' + pos;
        divRow.appendChild(divCell);
      }
    }
    game.winner = win();
    winnerEl.innerHTML = game.winner;
    mainGame.style.display = 'inline-block';
    startGame.style.display = 'none';
    mainGame.style.display = 'inline-block';
    startGame.style.display = 'none';
  }

  function createFields() {
    var inputVal = count.value;
    var size = +inputVal;

    if (isNaN(size) || size < 5 || size > 15 || size % 1 !== 0) {
      errMessage.innerHTML = 'Вы ввели некорректное число';
      return false;
    }
    game = {
      state: [],
      size: size,
      next: '',
      winner: ''
    };
    drawField();
    saveState();
  } // create fields
  function clickEvent(event) {
    if ((event.target.classList.contains('x') || event.target.classList.contains('o'))) {
      return false;
    }
    if ((!event.target.classList.contains('cell'))) {
      return false;
    }
    if (getWinner()) {
      return false;
    }
    nextClass = game.next;
    if (nextClass === 'x') {
      nextClass = 'o';
    } else {
      nextClass = 'x';
    }// міша зливай воду  міняїм на "х"
    event.target.classList.add(nextClass);
    game.state[event.target.attributes['data-index']] = nextClass;
    game.next = nextClass;
    win();
    game.winner = win();
    winnerEl.innerHTML = game.winner;
    saveState();
  }

  loadState();
  if (game !== null) {
    drawField();
  }
  function clickNewGame() {
    localStorage.clear('game');
    field.innerHTML = '';
    winnerEl.innerHTML = '';
    mainGame.style.display = 'none';
    startGame.style.display = 'inline-block';
    message = '';
    localStorage.clear('game');
  } // start to new game click
  field.addEventListener('click', clickEvent);
  startNewGame.addEventListener('click', clickNewGame);
  generateField.addEventListener('click', createFields);
  count.addEventListener('keyup', function hand(event) {
    if (event.keyCode !== 13) return;
    createFields();
  });
});