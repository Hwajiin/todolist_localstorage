const clock = document.querySelector(".clock__text");

const dayOfWeek = document.querySelector(".dayOfWeek");
const dayText = document.querySelector(".day");

const hourHand = document.querySelector(".hour-hand");
const minHand = document.querySelector(".min-hand");
const secHand = document.querySelector(".sec-hand");

// Clock function
function updateClock() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  clock.innerHTML = `${hours} : ${minutes} : ${seconds}`;
}

// day function
function updateDay() {
  const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const date = new Date();
  const day = date.getDate();
  const dayOfWeekIndex = date.getDay();
  const dayOfWeekText = week[dayOfWeekIndex];
  dayText.innerText = `${day}`;
  dayOfWeek.innerText = dayOfWeekText;
}

// watch
function updateWatch() {
  const date = new Date();
  const seconds = date.getSeconds();
  const secondsDeg = seconds * 6 + 90;
  secHand.style.transform = `rotate(${secondsDeg}deg)`;

  const minutes = date.getMinutes();
  const minutesDeg = minutes * 6 + 0.1 * seconds + 90;
  minHand.style.transform = `rotate(${minutesDeg}deg)`;

  const hours = date.getHours();
  const hoursDeg = hours * 30 + 0.5 * minutes + 90;
  hourHand.style.transform = `rotate(${hoursDeg}deg)`;
}

function init() {
  setInterval(updateClock, 1000);
  setInterval(updateWatch, 1000);
  updateClock();
  updateDay();
  updateWatch();
}

init();
