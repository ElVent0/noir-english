import "./main.html";

const profileEl = document.querySelector(".header__profile");
const closeProfileEl = document.querySelector(".profile__close");
const toggleEl = document.querySelector(".header__toggle");
const dotEl = document.querySelector(".header__dot");

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
