const $modalTotalMoves = document.querySelector('#modal-total-moves');
const $modalTimeSpent = document.querySelector('#modal-time-spent');

const $modalCloseButton = document.querySelector('#modal-close-button');

const $modalFirstStar = document.querySelector('#modal-first-star');
const $modalSecondStar = document.querySelector('#modal-second-star');
const $modalThirdStar = document.querySelector('#modal-third-star');

$modalCloseButton.addEventListener('click', resetGame);


function displayModelResults() {
  $modalTotalMoves.textContent = String(clickCounter / 2).padStart(2, '0');

  let seconds = timeSpent % 60;
  let minutes = Math.floor(timeSpent / 60);

  $modalTimeSpent.textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;


    if (clickCounter / 2 > 12) {
      $modalThirdStar.classList.remove('modal__star__color');

    }

    if (clickCounter / 2 > 16) {
      $modalSecondStar.classList.remove('modal__star__color');
    }

    if (clickCounter / 2 > 22) {
      $modalFirstStar.classList.remove('modal__star__color');
    }
}