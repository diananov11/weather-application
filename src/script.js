function changeWeather(response) {
  let cityTitle = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  let currentTemp = Math.round(response.data.temperature.current);
  let date = new Date(response.data.time * 1000);
  let dateCurrent = document.querySelector("#date-current");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let currentHumidity = response.data.temperature.humidity;
  let currentWind = response.data.wind.speed;
  let weatherDescription = document.querySelector("#weather-description");
  let emoji = document.querySelector("#emoji-temp");
  let image = response.data.condition.icon_url;

  weatherDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${currentHumidity}%`;
  wind.innerHTML = `${currentWind}km/h`;
  dateCurrent.innerHTML = dateTime(date);
  cityTitle.innerHTML = response.data.city;
  temp.innerHTML = currentTemp;
  emoji.innerHTML = `<img src="${image}" alt="icon" class="emoji-temp" />`;

  getForecast(response.data.city);
}

function dateTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function getCity(city) {
  let apiKey = "fdb1b4026fa299784f6o27t429cd3399";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(changeWeather);
}

function submitHandler(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  getCity(inputCity.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "fdb1b4026fa299784f6o27t429cd3399";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0) {
      forecastHtml += `<div class="weather-forecast-day">
  <div class="weather-forecast-date">${formatDay(day.time)}</div>
  <img src="${day.condition.icon_url}" class="weather-forecast-icon">
  <div class="weather-forecast-temperature">
    <div class="weather-forecast-temp">
      <strong>${Math.round(day.temperature.maximum)}°</strong>
    </div>
    <div class="weather-forecast-temp">${Math.round(
      day.temperature.minimum
    )}°</div>
  </div>
</div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let btn = document.querySelector("#input-button");
btn.addEventListener("click", submitHandler);

getCity("palembang");

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "fdb1b4026fa299784f6o27t429cd3399";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(changeWeather);
}

function changeCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let current = document.getElementById("current");
current.addEventListener("click", changeCurrent);
