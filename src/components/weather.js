const weatherBox = document.querySelector(".weather__box");

const API_KEY = "7aa02b398d0775f9a369d3ad4650a1ef";

function updateWeather() {
  navigator.geolocation.getCurrentPosition((position) => {
    const coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    async function getData() {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      const temp = Math.round(data.main.temp);
      weatherBox.innerHTML = `
        <div class="weather__info">
            <span class="temp">${temp} °C</span>
            <span class="weather">${data.weather[0].main}</span>
        </div>
        <span class="location">${data.name}</span>
      `;
    }
    getData();
  });
}

function init() {
  updateWeather();
}

init();
