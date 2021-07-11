const weatherBox = document.querySelector(".weather__box");

const API_KEY = "7aa02b398d0775f9a369d3ad4650a1ef";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const temp = Math.round(data.main.temp);
      weatherBox.innerHTML = `
        <div class="weather__info">
            <span class="temp">${temp} °C</span>
            <span class="weather">${data.weather[0].main}</span>
        </div>
        <span class="location">${data.name}</span>
      `;
    });
}

function onGeoError() {
  alert(`Can't find you. No weather for you`);
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
