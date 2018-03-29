

const cardStyles = [
  "fa-star",
  "fa-diamond",
  "fa-anchor",
  "fa-cube",
  "fa-bolt",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb"
];


const $container = document.querySelector('.container');

/**
 * 1- Create a div
 * 2- Create a child span for the icon to place
 * 3- Append main div into the container
 * 4- Call shuffleCards
 */
function createBoard() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 16; i++) {

    const newEl = document.createElement('div');
    newEl.classList.add('card');

    const childSpan = document.createElement('span');
    // 'fa' for font-awesome
    childSpan.classList.add('fa', 'icon');
    newEl.appendChild(childSpan);

    fragment.appendChild(newEl);
  }

  $container.appendChild(fragment);

  // Pair cards randomly after they are created
  shuffleCards();
}


/**
 * 1- Copy the contents of node list
 * 2- Then select and delete elements randomly from the cloned array
 * 4- Store them in the randomGroups array
 */
const randomGroups = [];

function shuffleCards() {
  const $cards = document.querySelectorAll('.card');
  const tempArray = [];
  // Copy contents of node list into an array
  for (let i = 0; i < $cards.length; i++) {
    tempArray.push($cards[i]);
  }

  let first, second;
  let cardStyleIndex = 0;
  // Create random pairs
  while (tempArray.length > 0) {
    first = tempArray.splice(Math.floor(Math.random() * tempArray.length), 1);
    second = tempArray.splice(Math.floor(Math.random() * tempArray.length), 1);

    // Since 'first' and 'second' is selected randomly, no need to shuffle icons
    let randomIcon = cardStyles[cardStyleIndex];


    first[0].firstElementChild.classList.add(randomIcon);
    second[0].firstElementChild.classList.add(randomIcon);
    // .splice() returns an array so put the first and only element instead of array
    randomGroups.push([first[0], second[0]]);

    cardStyleIndex++;
  }
}

createBoard();

$container.addEventListener('click', cardSelectHandler);

// Store found matches in this array
const validPairs = [];

// All the variables below are used in the event below
let
  actionCompleted = true,
  firstSelectedCard,
  secondSelectedCard,
  clickCounter = 0;


function cardSelectHandler(event) {
  /**
   * If there is a current action don't accept new clicks
   * If the clicked target already has the class 'open__card' don't perform any action
   */
  if (!actionCompleted || event.target.className.match(/open__card/gi))
    return;


  // Works only if the card is clicked not the whole container
  if (event.target.className.match(/card/gi)) {
    // Once the very first valid click occurs start timer
    if (clickCounter === 0) {
      updateTimer(true);
    }
    // if clickCounter is an odd number then it means it requires another pick
    if (clickCounter % 2 === 0 &&
      !(event.target.className.match(/open__card/gi))) {
      // Game logic
      firstSelectedCard = event.target;
      clickCounter++;

      // Visual effects
      firstSelectedCard.classList.add('open__card');
      setTimeout(() => {
        firstSelectedCard.firstElementChild.style.visibility = 'visible';
      }, 185)

    }
    else if (event.target !== firstSelectedCard &&
      !event.target.className.match(/open__card/gi)) {
      // Game logic
      secondSelectedCard = event.target;
      clickCounter++;
      actionCompleted = false;

      // Visual effects
      secondSelectedCard.classList.add('open__card');
      setTimeout(() => {
        secondSelectedCard.firstElementChild.style.visibility = 'visible';
      }, 185);
    }


    // If clickCounter is even number then it means picking is complete
    if (clickCounter % 2 === 0) {
      let matchFound = false;
      for (let i = 0; i < randomGroups.length; i++) {
        // If match is found
        if (randomGroups[i].includes(firstSelectedCard) &&
          randomGroups[i].includes(secondSelectedCard)) {

          // Previously picked cards can't be picked again
          if (!validPairs.includes(firstSelectedCard) &&
            !validPairs.includes(secondSelectedCard)) {


            // Add successful match styles
            setTimeout(() => {
              firstSelectedCard.classList.add('successful__match');
              secondSelectedCard.classList.add('successful__match');
            }, 515);

            validPairs.push(firstSelectedCard, secondSelectedCard);

            // After game resets there will be newly added valid pairs
            // The condition applies when it's multiples of 16
            if (validPairs.length === 16) {
              // When game is over
              // The function below is in the 'popup-result.js' file
              displayMoves();

              // When the game ends stop timer
              updateTimer(false);


              // Display model after some delay
              setTimeout(() => {
                document.querySelector('.modal')
                  .classList.add('display__modal');

                displayModalResults();
                validPairs.length = 0;
                randomGroups.length = 0;
              }, 1000)
            }

            matchFound = true;
            // Wait for effect to end before completing the action
            setTimeout(() => {
              actionCompleted = true;
              displayMoves();
              updateStarColor();
            }, 1000);
            break;
          }
        }
      }

      // If user fails to match the cards
      if (!matchFound &&
        !validPairs.includes(firstSelectedCard) &&
        !validPairs.includes(secondSelectedCard)) {


        // Shake effect is added
        setTimeout(() => {
          firstSelectedCard.classList.add('failed__match');
          secondSelectedCard.classList.add('failed__match');

        }, 510);


        // Shake effect is gone
        setTimeout(() => {
          firstSelectedCard.classList.remove('failed__match');
          secondSelectedCard.classList.remove('failed__match');
        }, 1160);

        // Icon disappears
        setTimeout(() => {
          firstSelectedCard.firstElementChild.style.visibility = 'hidden';
          secondSelectedCard.firstElementChild.style.visibility = 'hidden';
        }, 1350);
        // Cards starts flipping
        setTimeout(() => {
          firstSelectedCard.classList.remove('open__card');
          secondSelectedCard.classList.remove('open__card');
        }, 1200);

        // Action is complete
        setTimeout(() => {
          actionCompleted = true;
          displayMoves();
          updateStarColor();
        }, 1370);
      }

    }
  }
};
