(function () {


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



  function createBoard() {
    const containerChild = document.createElement('div');
    for (let i = 0; i < 16; i++) {

      const newEl = document.createElement('div');
      newEl.classList.add('card');
      newEl.setAttribute('id', 'card-' + i);

      const childSpan = document.createElement('span');
      // 'fa' for font-awesome, 'icon' for my customization
      childSpan.classList.add('fa');
      newEl.appendChild(childSpan);

      containerChild.appendChild(newEl);
    }

    $container.appendChild(containerChild);

    // Pair cards randomly after they are created
    shuffleCards();
  }



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
  // Select cards globally
  const $cards = document.querySelectorAll('.card');



  // Store found matches in this array
  const validPairs = [];

  // All the variables below are used in event below
  let
    actionCompleted = true,
    firstSelectedCard,
    secondSelectedCard,
    clickCounter = 0;

  $container.addEventListener('click', (event) => {

    // If the event has any active timeout don't perform action
    if (!actionCompleted || event.target.className.match(/open__card/gi))
      return;
    // Works only if the card is clicked not the whole container
    if (event.target.className.match(/card|open__card/gi)) {
      console.log('is entered');
      // if clickCounter is an odd number then it means it requires another pick
      if (clickCounter % 2 === 0 &&
          !(event.target.className.match(/open__card/gi))) {
        console.log(event.target.className);
        // Game logic
        firstSelectedCard = event.target;
        clickCounter++;

        // Visual effects
        event.target.classList.add('open__card');

        // document.querySelector('.open__card > span').style.visibility = 'visible';
      }
      else if (event.target !== firstSelectedCard &&
              !(event.target.className.match(/open__card/gi))) {
        // Game logic
        secondSelectedCard = event.target;
        clickCounter++;
        actionCompleted = false;

        // Visual effects
        event.target.classList.add('open__card');
      }


      // If clickCounter is even number then it means picking is complete
      if (clickCounter % 2 === 0) {
        let matchFound = false;
        for (let i = 0; i < randomGroups.length; i++) {
          if (randomGroups[i].includes(firstSelectedCard) &&
            randomGroups[i].includes(secondSelectedCard)) {

            if (!validPairs.includes(firstSelectedCard) &&
              !validPairs.includes(secondSelectedCard)) {

              validPairs.push(firstSelectedCard, secondSelectedCard);
              console.log('Match found');
              matchFound = true;
              actionCompleted = true;
            }
          }
        }

        setTimeout(() => {
          if (!matchFound &&
            !validPairs.includes(firstSelectedCard) &&
            !validPairs.includes(secondSelectedCard)) {

            firstSelectedCard.classList.remove('open__card');
            secondSelectedCard.classList.remove('open__card');

            console.log('No match found');
            actionCompleted = true;

            // Empty variables to prevent behaviour bugs
            firstSelectedCard = undefined;
            secondSelectedCard = undefined;
          }

        }, 1000)
      }
    }
    console.log(randomGroups);
  });
})();