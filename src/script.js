function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let inputCity = document.querySelector("#input-city");
  city.innerHTML = inputCity.value;
}

let btn = document.querySelector("#input-button");
btn.addEventListener("click", changeCity);
