const $repeatButton = document.querySelector('#repeat-game');
const $totalMoves = document.querySelector('#moves');
const $timeSpent = document.querySelector('#time-spent');


// Stars for user memory performance
const $firstStar = document.querySelector('#first-star');
const $secondStar = document.querySelector('#second-star');
const $thirdStar = document.querySelector('#third-star');

$container.addEventListener('click', cardSelectHandler);

let timeSpent = 0;

function resetGame() {
  // remove current contents
  while ($container.firstElementChild) {
    $container.firstElementChild.remove();
  }
  // Add new content again
  randomGroups.length = 0;
  createBoard();
  resetLabels();
  updateTimer(false);
  validPairs.length = 0;
}

$repeatButton.addEventListener('click', resetGame);



// Will be called inside 'main.js'
function displayMoves() {
  let movesMade = clickCounter / 2;
  $totalMoves.textContent = String(movesMade).padStart(2, '0');
}



let interval;
function updateTimer(timerState) {
  if (!timerState) {
    clearInterval(interval);
    return;
  }

  let seconds = 0, minutes = 0;
  interval = setInterval(() => {
    seconds++;
    timeSpent++;

    if (seconds > 59) {
      minutes++;
      seconds = 0;
    }

    // Make the output pretty
    $timeSpent.textContent =
      `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);

}



function resetLabels() {
  $timeSpent.textContent = '00:00';
  $totalMoves.textContent = '00';
  clickCounter = 0;

  $firstStar.classList.add('star__color');
  $secondStar.classList.add('star__color');
  $thirdStar.classList.add('star__color');

  timeSpent = 0, totalStars = 0;

  document.querySelector('.modal').classList.remove('display__modal');

  document.querySelector('#modal-first-star').
    classList.remove('modal__star_color');

  document.querySelector('#modal-second-star').
    classList.remove('modal__star_color');

  document.querySelector('#modal-third-star').
    classList.remove('modal__star_color');
}



function updateStarColor() {
  let movesMade = clickCounter / 2;
  if (movesMade > 12) {
    $thirdStar.classList.remove('star__color');
  }

  if (movesMade > 16) {
    $secondStar.classList.remove('star__color');
  }

  if (movesMade > 22) {
    $firstStar.classList.remove('star__color');
  }
}
