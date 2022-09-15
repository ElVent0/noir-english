import "./index.html";

const signInEl = document.querySelector("[data-sign-in]");
const signUpEl = document.querySelector("[data-sign-up]");
const signUpButton = document.querySelector(".sign-in__sign-up");
const backButton = document.querySelector(".back__paragraph");

// ------------------------------------------------------------------

signUpButton.addEventListener("click", onSignUp);

function onSignUp() {
  signInEl.classList.add("hidden");
  signUpEl.classList.remove("hidden");
}

backButton.addEventListener("click", onBack);

function onBack() {
  signInEl.classList.remove("hidden");
  signUpEl.classList.add("hidden");
}
