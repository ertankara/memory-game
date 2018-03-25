(function () {


  const $container = document.querySelector('.container');



  function createBoard() {
    const containerChild = document.createElement('div');
    for (let i = 0; i < 16; i++) {
      const newEl = document.createElement('div');
      newEl.classList.add('card');
      newEl.setAttribute('id', 'card-' + i);

      containerChild.appendChild(newEl);
    }

    $container.appendChild(containerChild);

    // Pair cards randomly after they are created
    shuffleCards();
  }



  function shuffleCards() {
    const $cards = document.querySelectorAll('.card');
    const tempArray = [];
    // Copy contents of node list into an array
    for (let i = 0; i < $cards.length; i++) {
      tempArray.push($cards[i]);
    }

    const randomGroups = [];
    let first, second;

    // Create random pairs
    let idNumber = 0;
    while (tempArray.length > 0) {
      idNumber++;
      first = tempArray.splice(Math.floor(Math.random() * tempArray.length), 1);
      second = tempArray.splice(Math.floor(Math.random() * tempArray.length), 1);
      randomGroups.push([first, second, idNumber]);
    }
  }


  createBoard();
  // Select cards globally
  const $cards = document.querySelectorAll('.card');



  $container.addEventListener('click', (event) => {
    // Returns null if no match is found
    if (event.target.className.match(/card/gi)) {

    }
  });


})();