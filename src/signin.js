import "./index.html";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const signInEl = document.querySelector("[data-sign-in]");
const signUpEl = document.querySelector("[data-sign-up]");
const signUpButton = document.querySelector(".sign-in__sign-up");
const backButton = document.querySelector(".back__paragraph");
const guestButton = document.querySelector(".sign-in__guest");
const signInButton = document.querySelectorAll(".sign-in__button");

signInButton.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    Notify.failure("Registration is currently unavailable");
  });
});

signUpButton.addEventListener("click", onSignUp);

function onSignUp() {
  signInEl.classList.add("deleted");
  guestButton.classList.add("deleted");
  signUpEl.classList.remove("deleted");
}

backButton.addEventListener("click", onBack);

function onBack() {
  signInEl.classList.remove("deleted");
  guestButton.classList.remove("deleted");
  signUpEl.classList.add("deleted");
}
