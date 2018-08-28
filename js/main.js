'use strict';

var MemoryGame = (function () {
  var num_card, num_img, // number of cards, and number of images
    flipped, memory_value, memory_card_id,
    start_time, end_time;

  function startNewGame() {
    var img_name = [];
    for (var i = 0; i < num_img; i++) {
      for (var j = 0; j < 2; j++) {
        img_name.push(i + 1);
      }
    }

    var img_name_shuffled = shuffleCard(img_name);

    var output = '';
    for (var i = 0; i < num_card; i++) {
      output += `<div class="memory-game__card" id="card-${i}" data-img=${img_name_shuffled[i]} onclick="MemoryGame.flipCard(this, ${img_name_shuffled[i]})"><div class="card--front" id="front"></div><div class="card--back" id="back"></div></div>`;
    }
    document.getElementById('memory-game').innerHTML = output;

    // Show card
    let cards = document.querySelectorAll('.memory-game__card');
    let time = 1000;
    cards.forEach(card => {
      let back = card.children[1];
      let backImg = card.getAttribute('data-img');
      setTimeout(() => {
        card.classList.add('is-clicked');
        back.style.backgroundImage = `url(img/${backImg}.png)`;
      }, time);
      time += 200;
    });

    cards.forEach(card => {
      let front = card.children[0];
      setTimeout(() => {
        card.classList.remove('is-clicked');
      }, 5000);
    });

    // start measuring time
    startGameTime();
  }

  function startGameTime() {
    start_time = new Date();
  }

  function endGameTime() {
    end_time = new Date();
    var time_diff = end_time - start_time;
    time_diff /= 1000;

    // Get seconds
    var seconds = Math.round(time_diff);
    return seconds;
  }

  function shuffleCard(arr) {
    var count = num_card - 1;
    while (count > 0) {
      var i = Math.floor(Math.random() * num_card);
      var temp = arr[i];
      arr[i] = arr[count];
      arr[count] = temp;
      count--;
    }
    return arr;
  }

  function flipCard(card, img) {
    // Card front and back
    var front = card.children[0];
    var back = card.children[1];

    if (memory_value.length < 2) {
      // Add a class to style the card
      card.classList.add('is-clicked');
      back.style.backgroundImage = `url(img/${img}.png)`;
      if (memory_value.length === 0) {
        memory_value.push(img);
        memory_card_id.push(card.id);
      } else if (memory_value.length === 1) {
        memory_value.push(img);
        memory_card_id.push(card.id);
        if (memory_value[0] == memory_value[1]) {
          flipped += 2;
          memory_value = [];
          memory_card_id = [];
          // Check to see if the whole board is cleared.
          if (flipped === num_card) {
            setTimeout(function () {
              var time = endGameTime();
              var another_round = confirm('Game cleared! You had ' + time + ' seconds to complete this game! Go another round?');
              if (another_round) {
                startNewGame();
              }
            }, 2000);
          }
        } else {
          function flip2Back() {
            var card1 = document.getElementById(memory_card_id[0]);
            var card2 = document.getElementById(memory_card_id[1]);
            card1.classList.remove('is-clicked');
            card2.classList.remove('is-clicked');
            // clear both arrays
            memory_value = [];
            memory_card_id = [];
          }
          setTimeout(flip2Back, 700);
        }
      }
    }
  }

  function init() {
    num_img = 8;
    num_card = num_img * 2;
    flipped = 0;
    memory_value = [];
    memory_card_id = [];
    start_time = 0;
    end_time = 0;

    startNewGame();
  }

  return {
    init,
    flipCard
  };

}());

var KeyboardSound = (function () {

  const audio = document.querySelector('audio');
  console.log(audio);

  function playSound(e) {
    audio.currentTime = 0;
    audio.play();
  }

  function init() {
    window.addEventListener('keydown', playSound);
  }

  return {
    init
  }

}());

MemoryGame.init();
KeyboardSound.init();