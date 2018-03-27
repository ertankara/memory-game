const $repeatButton = document.querySelector('#repeat-game');
const $totalMoves = document.querySelector('#moves');
const $timeSpent = document.querySelector('#time-spent');


$container.addEventListener('click', cardSelectHandler);


$repeatButton.addEventListener('click', () => {
  // remove current contents
  while($container.firstElementChild) {
    $container.firstElementChild.remove();
  }
  // Add new content again
  createBoard();
  resetLabels();
  updateTimer(false);
});



// Will be called inside 'main.js'
function displayMoves(totalClick) {
  let movesMade = totalClick / 2;
  if (movesMade < 10) {
    movesMade = '0' + movesMade;
  }
  $totalMoves.textContent = movesMade;
}



let interval;
function updateTimer(timerState) {
  if (!timerState ) {
    clearInterval(interval);
    return;
  }

  let seconds = 0, minutes = 0;
  interval = setInterval(() => {
    seconds++;

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
}
