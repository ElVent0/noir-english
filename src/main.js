import "./main.html";
import wordsArray from "./words.json";

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

checkTheme();
function checkTheme() {
  if (localStorage.getItem("light-theme") === "true") {
    dotEl.classList.add("dot-move-forvard");
    dotEl.classList.remove("dot-move-back");
    toggleEl.classList.add("light-ui__toggle");
    dotEl.classList.add("light-ui__dot");
    document.querySelector(".profile__background").classList.add("light-ui");
    document.querySelector(".main").classList.add("light-ui");
    document.querySelector(".header").classList.add("light-ui");
    document.querySelector(".footer").classList.add("light-ui");
    document.querySelector(".footer__icon-github").classList.add("light-ui");
    document.querySelector(".main__item").classList.add("light-ui__item");
    document.querySelector("body").classList.add("light-ui");
    document
      .querySelectorAll(".main__item")
      .forEach((elem) => elem.classList.add("light-ui__item"));
    document.querySelector(".profile").classList.add("light-ui");
    document.querySelector(".profile__content").classList.add("light-ui__item");
  }
}

// function checkGameTheme() {
//   if (localStorage.getItem("light-theme") === "true") {
//     document.querySelector("body").classList.add("light-ui");
//     document.querySelector("game__top-content").classList.add("light-ui-item");
//     document
//       .querySelector("game__bottom-content")
//       .classList.add("light-ui-item");
//   }
// }

function onToggle() {
  if (dotEl.classList.contains("dot-move-back")) {
    localStorage.setItem("light-theme", true);
    dotEl.classList.add("dot-move-forvard");
    dotEl.classList.remove("dot-move-back");

    toggleEl.classList.add("light-ui__toggle");
    dotEl.classList.add("light-ui__dot");

    document.querySelector(".profile__background").classList.add("light-ui");
    document.querySelector(".main").classList.add("light-ui");
    document.querySelector(".header").classList.add("light-ui");
    document.querySelector(".footer").classList.add("light-ui");
    document.querySelector(".footer__icon-github").classList.add("light-ui");
    document.querySelector(".main__item").classList.add("light-ui__item");
    document.querySelector("body").classList.add("light-ui");
    document
      .querySelectorAll(".main__item")
      .forEach((elem) => elem.classList.add("light-ui__item"));
    document.querySelector(".profile").classList.add("light-ui");
    document.querySelector(".profile__content").classList.add("light-ui__item");
  } else if (dotEl.classList.contains("dot-move-forvard")) {
    localStorage.setItem("light-theme", false);
    dotEl.classList.add("dot-move-back");
    dotEl.classList.remove("dot-move-forvard");

    toggleEl.classList.remove("light-ui__toggle");
    dotEl.classList.remove("light-ui__dot");
    document.querySelector(".profile__background").classList.remove("light-ui");
    document.querySelector(".main").classList.remove("light-ui");
    document.querySelector(".header").classList.remove("light-ui");
    document.querySelector(".footer").classList.remove("light-ui");
    document.querySelector(".footer__icon-github").classList.remove("light-ui");
    document
      .querySelectorAll(".main__item")
      .forEach((elem) => elem.classList.remove("light-ui__item"));
    document.querySelector("body").classList.remove("light-ui");
    document.querySelector(".profile").classList.remove("light-ui");
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
  // if (e.target.classList.contains("game-first")) {
  renderGameFirst();
  // }
  // if (e.target.hasAttribute("data-game-second")) {
  //   renderGameFirst();
  // }
  // if (e.target.hasAttribute("data-game-third")) {
  //   renderGameFirst();
  // }
}

function renderGameFirst() {
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
  // }

  bodyEl.insertAdjacentHTML("beforeend", markup);
  // checkGameTheme();
  // onToggle();
  if (localStorage.getItem("light-theme") === "true") {
    document.querySelector(".game__content").classList.add("light-ui__item");
  }
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
let newWords = [];
let newDescriptions = [];
let descriptionNumber = -1;
let description = null;
async function renderQuestion() {
  counter += 1;

  let resultWord = null;
  let resultWordTwo = null;
  let resultWordThree = null;
  let resultWordFour = null;
  let resultDescription = null;
  while (true) {
    try {
      const number = (Math.random() * (wordsArray.length - 1 - 0) + 0).toFixed(
        0
      );
      const numberTwo = (
        Math.random() * (wordsArray.length - 1 - 0) +
        0
      ).toFixed(0);
      const numberThree = (
        Math.random() * (wordsArray.length - 1 - 0) +
        0
      ).toFixed(0);
      const numberFour = (
        Math.random() * (wordsArray.length - 1 - 0) +
        0
      ).toFixed(0);
      resultWord = wordsArray[number];
      resultWordTwo = wordsArray[numberTwo];
      resultWordThree = wordsArray[numberThree];
      resultWordFour = wordsArray[numberFour];
      console.log(`Випадкове слово: ${resultWord}`);
      resultDescription = await fetchData(resultWord);
      console.log(
        `Дані по випадковому слову: ${resultDescription[0].meanings[0].definitions[0].definition}`
      );
      break;
    } catch (e) {
      console.log(e);
    }
  }
  console.log(
    "Done",
    resultWord[0],
    "-",
    resultDescription[0].meanings[0].definitions[0].definition
  );

  const arrayRandom = [];
  arrayRandom.push(resultWord);
  arrayRandom.push(resultWordTwo);
  arrayRandom.push(resultWordThree);
  arrayRandom.push(resultWordFour);

  function makeRandomArr(a, b) {
    return Math.random() - 0.5;
  }

  arrayRandom.sort(makeRandomArr);

  console.log(arrayRandom);
  const options = arrayRandom
    .map((item) => {
      console.log(resultWord);
      console.log(item);
      if (resultWord === item) {
        return `<li class="game__answer" data-correct>${item}</li>`;
      }
      if (resultWord !== item) {
        return `<li class="game__answer">${item}</li>`;
      }
    })
    .join("");
  console.log(options);
  description = resultDescription[0].meanings[0].definitions[0].definition;
  // const options = `
  // <li class="game__answer" data-correct>Word</li>
  //             <li class="game__answer">Word</li>
  //             <li class="game__answer">Word</li>
  //             <li class="game__answer">Word</li>
  // `;
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
              ${description}
            </p>
          </div>
          <div class="game__bottom-content">
            <ul class="game__list">
              ${options}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
  document.querySelector(".game").remove();
  bodyEl.insertAdjacentHTML("beforeend", markup);
  if (localStorage.getItem("light-theme") === "true") {
    document.querySelector(".game__content").classList.add("light-ui__item");
    document.querySelector(".game__counter").classList.add("light-ui__item");
  }
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
      document
        .querySelector("[data-correct]")
        .classList.add("game__answer--green");
      event.currentTarget.classList.add("unactive");
      newWords.push(document.querySelector("[data-correct]").textContent);
      newDescriptions.push(description);
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

async function fetchData(randomWord) {
  const randomJson = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`
  );
  return randomJson.json();
}

function onTimeOut() {
  document.querySelector("[data-correct]").classList.add("game__answer--green");
  newWords.push(document.querySelector("[data-correct]").textContent);
  newDescriptions.push(description);
  description = null;
  document.querySelector(".game__list").classList.add("unactive");
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
  console.log(newWords);
  const newWordsForList = newWords
    .map((item) => {
      descriptionNumber += 1;
      return `
    <li class="game__new-words-item"><b>${item}</b> - ${newDescriptions[descriptionNumber]}</li>
    `;
    })
    .join("");
  descriptionNumber = -1;
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
          <ul class="game__new-words-list">${newWordsForList}</ul>
        </div>
      </div>
      
      <div class="game__finish-buttons">
        <button class="game__finish-button" data-game-first>
            <svg class="main__icon-small">
              <use
                href="assets/icons.svg#home"
                width="25.13"
                height="20"
              ></use>
            </svg>
            <p class="game__button-text">HOME</p>
        </button>
        <button class="game__finish-button" data-game-first data-again>
            <svg class="main__icon-small">
              <use
                href="assets/icons.svg#home"
                width="25.13"
                height="20"
              ></use>
            </svg>
            <p class="game__button-text ">AGAIN</p>
        </button>
      </div>
      </div>
    </section>
  `;
  document.querySelector(".game").remove();
  // Звідси можна забрати кількість правильних відповідей - correctAnswersNumber
  correctAnswersNumber = 0;
  bodyEl.insertAdjacentHTML("beforeend", markup);
  document.querySelector(".game").classList.add("game--media");
  if (localStorage.getItem("light-theme") === "true") {
    document.querySelector(".game__content").classList.add("light-ui__item");
    document
      .querySelector(".game__finish-button")
      .classList.add("light-ui__item");
    document
      .querySelector(".game__button-text")
      .classList.add("light-ui__item");
  }
  newWords = [];
  newDescriptions = [];
  document
    .querySelector(".game__finish-button")
    .addEventListener("click", finishGame);
  document.querySelector("[data-again]").addEventListener("click", playAgain);
}

function playAgain() {
  finishGame();
  document.querySelector(".header").classList.add("deleted");
  document.querySelector(".main").classList.add("deleted");
  document.querySelector(".footer").classList.add("deleted");
  renderGameFirst();
}

function finishGame() {
  document.querySelector(".game").remove();
  document.querySelector(".header").classList.remove("deleted");
  document.querySelector(".main").classList.remove("deleted");
  document.querySelector(".footer").classList.remove("deleted");
}
