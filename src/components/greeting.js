const greetingBox = document.querySelector(".greeting__box");
const greetingForm = document.querySelector(".greeting__form");
const greetingInput = document.querySelector(".greeting__input");
const greetingText = document.querySelector(".greeting__text");

const CURRENT_USER = "current_user";

const bgList = ["1.JPG", "2.JPG", "3.JPG", "4.JPG", "5.JPG", "6.JPG"];

function saveUserName(name) {
  localStorage.setItem(CURRENT_USER, name);
}

function handleSubmit(e) {
  e.preventDefault();
  const name = greetingInput.value;
  saveUserName(name);
  displayGreeting(name);
  greetingInput.value = "";
  greetingForm.style.display = "none";
  paintBg();
}

function askForName() {
  greetingForm.style.display = "block";
  greetingForm.addEventListener("submit", handleSubmit);
}

function displayGreeting(text) {
  greetingText.style.display = "block";
  greetingText.innerHTML = `
  <div>hello</div>
  <span>${text}</span>
  `;
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function paintBg() {
  const idx = randomNum(0, bgList.length);
  greetingBox.style.backgroundImage = `url("../src/img/${bgList[idx]}")`;
}

function init() {
  const current_user = localStorage.getItem(CURRENT_USER);
  if (!current_user) {
    askForName();
  } else {
    displayGreeting(current_user);
    paintBg();
  }
}

init();
