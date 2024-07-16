function changeWeather(response) {
  let cityTitle = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  let currentTemp = Math.round(response.data.temperature.current);

  cityTitle.innerHTML = response.data.city;
  temp.innerHTML = currentTemp;
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

let btn = document.querySelector("#input-button");
btn.addEventListener("click", submitHandler);
