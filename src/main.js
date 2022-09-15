import "./main.html";

const profileEl = document.querySelector(".header__profile");
const closeProfileEl = document.querySelector(".profile__close");
const toggleEl = document.querySelector(".header__toggle");
const dotEl = document.querySelector(".header__dot");
const bodyEl = document.querySelector("body");

profileEl.addEventListener("click", onProfileOpen);

function onProfileOpen() {
  document.querySelector(".header").classList.add("backdrop");
  document.querySelector(".main").classList.add("backdrop");
  document.querySelector(".footer").classList.add("backdrop");
  setTimeout(() => {
    document.querySelector(".profile").classList.remove("deleted");
  }, 100);
}

closeProfileEl.addEventListener("click", onProfileClose);

function onProfileClose() {
  document.querySelector(".header").classList.remove("backdrop");
  document.querySelector(".main").classList.remove("backdrop");
  document.querySelector(".footer").classList.remove("backdrop");
  document.querySelector(".profile").classList.add("deleted");
}

toggleEl.addEventListener("click", onToggle);

function onToggle() {
  if (dotEl.classList.contains("dot-move-back")) {
    dotEl.classList.add("dot-move-forvard");
    dotEl.classList.remove("dot-move-back");
  } else if (dotEl.classList.contains("dot-move-forvard")) {
    dotEl.classList.add("dot-move-back");
    dotEl.classList.remove("dot-move-forvard");
  } else {
    dotEl.classList.add("dot-move-forvard");
  }
}

document
  .querySelector(".profile")
  .addEventListener("click", onProfileCloseByBackdrop);

function onProfileCloseByBackdrop(e) {
  if (e.target.classList.contains("profile")) {
    onProfileClose();
  }
}

document
  .querySelector("[data-game-first]")
  .addEventListener("click", onMainHide);
document
  .querySelector("[data-game-second]")
  .addEventListener("click", onMainHide);
document
  .querySelector("[data-game-third]")
  .addEventListener("click", onMainHide);

function onMainHide() {
  document.querySelector(".header").classList.add("deleted");
  document.querySelector(".main").classList.add("deleted");
  document.querySelector(".footer").classList.add("deleted");
  renderGame();
}

function renderGame() {
  const markup = `
  <section class="game">
  <div class="game__container">
      <div class="game__content">
        <div class="game__top-content">
          <p class="game__get-ready">GET READY</p>
          <p class="game__entry-timer">3</p>
        </div>
      </div>
      </div>
    </section>
  `;
  bodyEl.insertAdjacentHTML("beforeend", markup);
  setTimeout(() => {
    document.querySelector(".game__entry-timer").textContent = "2";
  }, 1000);
  setTimeout(() => {
    document.querySelector(".game__entry-timer").textContent = "1";
  }, 2000);
  setTimeout(renderQuestion, 3000);
}

let counter = 0;
let a;
let b;
let timer;
let correctAnswersNumber = 0;

function renderQuestion() {
  counter += 1;
  const markup = `
  <section class="game">
      <div class="game__container">
        <p class="game__counter">${counter}/5</p>
        <div class="proggress">
          <div class="proggress__line"></div>
        </div>
        <div class="game__content">
          <div class="game__top-content">
            <p class="game__question">
              There are a few words will be here to describe word
            </p>
          </div>
          <div class="game__bottom-content">
            <ul class="game__list">
              <li class="game__answer" data-correct>Word</li>
              <li class="game__answer">Word</li>
              <li class="game__answer">Word</li>
              <li class="game__answer">Word</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
  document.querySelector(".game").remove();
  bodyEl.insertAdjacentHTML("beforeend", markup);
  timer = setTimeout(onTimeOut, 12000);
  document.querySelector(".game__list").addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-correct")) {
      event.target.classList.add("game__answer--green");
      correctAnswersNumber += 1;
      event.currentTarget.classList.add("unactive");
      clearTimeout(timer);
      a = setTimeout(renderQuestion, 3000);
    } else if (
      !event.target.hasAttribute("data-correct") &&
      !event.target.classList.contains("game__list")
    ) {
      event.target.classList.add("game__answer--red");
      event.currentTarget.classList.add("unactive");
      console.log(777);
      clearTimeout(timer);
      b = setTimeout(renderQuestion, 3000);
    }
  });

  if (counter === 6) {
    console.log("3", counter);
    counter = 0;
    renderResult();
  }
}

function onTimeOut() {
  document.querySelector("[data-correct]").classList.add("game__answer--green");
  document.querySelector("[data-correct]").classList.add("unactive");
  a = setTimeout(renderQuestion, 3000);
}

function renderResult() {
  clearTimeout(a);
  clearTimeout(b);
  clearTimeout(timer);
  let ratingUpdate;
  if (correctAnswersNumber === 1) {
    ratingUpdate = `<span class="text-red">- 5</span>`;
  } else if (correctAnswersNumber === 2) {
    ratingUpdate = `<span class="text-grey">+ 0</span>`;
  } else if (correctAnswersNumber === 3) {
    ratingUpdate = `<span class="text-green">+ 2</span>`;
  } else if (correctAnswersNumber === 4) {
    ratingUpdate = `<span class="text-green">+ 5</span>`;
  } else if (correctAnswersNumber === 5) {
    ratingUpdate = `<span class="text-green">+ 10</span>`;
  } else if (correctAnswersNumber === 0) {
    ratingUpdate = `<span class="text-red">- 7</span>`;
  }
  const currentRating = 123;
  const markup = `
  <section class="game">
      <div class="game__container">
      <div class="game__content">
      <div class="game__result">
        <p class="game__paragraph-result">Your score:</p>
        <p class="game__number-result">${correctAnswersNumber}</p>
        <p class="game__paragraph-rating">Your rating: ${currentRating} ${ratingUpdate}</p>
      </div>
      <div class="game__new-words">
          <p class="game__paragraph-new-words">New words:</p>
          <ul class="game__new-words-list">Тут будуть нові слова</ul>
        </div>
      </div>
      
      <button class="game__finish-button" data-game-first>
              <svg class="main__icon-small">
                <use
                  href="assets/icons.svg#home"
                  width="25.13"
                  height="20"
                ></use>
              </svg>
              <p class="main__button-text">HOME</p>
            </button>
      </div>
    </section>
  `;
  document.querySelector(".game").remove();
  // Звідси можна забрати кількість правильних відповідей - correctAnswersNumber
  correctAnswersNumber = 0;
  bodyEl.insertAdjacentHTML("beforeend", markup);
  document
    .querySelector(".game__finish-button")
    .addEventListener("click", finishGame);
}

function finishGame() {
  document.querySelector(".game").remove();
  document.querySelector(".header").classList.remove("deleted");
  document.querySelector(".main").classList.remove("deleted");
  document.querySelector(".footer").classList.remove("deleted");
}
