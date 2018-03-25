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
      childSpan.classList.add('icon', 'fa');
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

      // Since first and second is selected randomly, icons can be in regular order
      let randomIcon = cardStyles[cardStyleIndex];

      console.log(randomIcon);

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


  let
    firstSelectedCard,
    secondSelectedCard,
    clickCounter = 0;

  $container.addEventListener('click', (event) => {
      // if clickCounter is an odd number then it means it requires another pick
    if (event.target.className.match(/card/gi) && clickCounter % 2 === 0) {
      firstSelectedCard = event.target;
      clickCounter++;
    }
    else if (event.target.className.match(/card/gi) &&
            event.target !== firstSelectedCard) {

      secondSelectedCard = event.target;
      clickCounter++;
    }

    // If clickCounter is even number then it means picking is complete
    if (clickCounter % 2 === 0) {
      let matchFound = false;
      for (let i = 0; i < randomGroups.length; i++) {
        if (randomGroups[i].includes(firstSelectedCard) &&
            randomGroups[i].includes(secondSelectedCard)) {

          console.log('Match found');
          matchFound = true;

        }
      }
      if (!matchFound) {
        console.log('No match found');
      }


    }

  });

  console.log(randomGroups);



})();