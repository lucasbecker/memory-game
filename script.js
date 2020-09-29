const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard(){
  if(lockBoard) return;
  if(this === firstCard) return;

  this.classList.add('flip');

  if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkForMath();
}

function checkForMath(){
  if(firstCard.dataset.card === secondCard.dataset.card){
    disableCards();
    return;
  }

  unflipCard();
}

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  firstCard.style.cursor = 'default';
  secondCard.removeEventListener('click', flipCard);
  firstCard.style.cursor = 'default';

  reseatBoard();
}

function unflipCard(){
  lockBoard = true;

  setTimeout( () => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    reseatBoard();
  }, 1000);
}

function reseatBoard(){
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle(){
  cards.forEach( card => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  })
})()

cards.forEach( card => {
  card.addEventListener('click', flipCard);
})