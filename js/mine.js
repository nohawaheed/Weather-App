let searchInput = document.querySelector("#searchInput");
let cairo = "cairo";
if (searchInput.value == "") {
  getWeather(cairo);
}
searchInput.addEventListener("keyup", function () {
  let inputValue = searchInput.value;
  if (inputValue.length < 3) {
    getWeather(cairo);
  } else {
    getWeather(inputValue);
  }
  console.log(inputValue.length);
});

let weatherForcast = [];

async function getWeather(searchValue) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=35ee64ad951c4af6a26133956221201&q=${searchValue}&days=3&aqi=no&alerts=no`
  );
  weatherForcast = await response.json();
  // console.log(searchValue.length);

  displayWeather();
}

var weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let myDate = new Date();
let todaysDate = myDate.getDay();
let tomorrowsDate = (myDate.getDay() + 1) % 7;
let theDayAfterTomorrow = (myDate.getDay() + 2) % 7;

function displayWeather() {
  let container = `<div class="col-md-4 forcast-bg rounded-start">
      <div class="d-flex justify-content-between forcast-header">
        <h6 class="header-bg ps-3 p-2">${weekdays[todaysDate]}</h6>
        <h6 class="header-bg pe-3 p-2">${weatherForcast.forecast.forecastday[0].date}</h6>
      </div>
      <h5 class="ps-3 header-bg pe-3 p-2">${weatherForcast.location.name}</h5>
      <h2 class="ps-4 header-bg pe-3 p-2 text-white fw-bolder display-2">${weatherForcast.current.temp_c}<sup>o</sup>C <img src="https:${weatherForcast.current.condition.icon}" width="90" height="90" alt=""></h2>
      <p class="ps-3 text-info">${weatherForcast.current.condition.text}</p>
      <div class="d-flex justify-content-start">
        <div class="pe-2 ps-3">
          <img
            src="images/icon-umberella.png"
            class="img-fluid"
            alt="icon-umberella"
          />
        </div>
        <div>
          <p class="text-muted fw-bold pe-3">20%</p>
        </div>
        <div class="pe-2">
          <img src="images/icon-wind.png" class="img-fluid" alt="icon-wind" />
        </div>
        <div>
          <p class="text-muted fw-bold pe-3">18km/h</p>
        </div>
        <div class="pe-2">
          <img
            src="images/icon-compass.png"
            class="img-fluid"
            alt="icon-compass"
          />
        </div>
        <div>
          <p class="text-muted fw-bold">East</p>
        </div>
      </div>
    </div>
    <div class="col-md-4 middle-forcast-bg">
            <div class="d-flex justify-content-center forcast-header">
              <h6 class="header-bg p-2">${weekdays[tomorrowsDate]}</h6>
            </div>
            <div class="d-flex flex-column align align-items-center justify-content-justify-content-center pt-5">
            <img src="https:${weatherForcast.forecast.forecastday[1].day.condition.icon}"  width="50" height="50" alt="">
            <h5 class="text-white fw-bold">${weatherForcast.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C </h5>
            <p class="text-muted fw-bold">${weatherForcast.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C </p>
            <p class="ps-3 text-info">${weatherForcast.forecast.forecastday[1].day.condition.text}</p>
            </div>
          </div>
          <div class="col-md-4 forcast-bg rounded-end">
            <div class="d-flex justify-content-center forcast-header">
              <h6 class="header-bg p-2">${weekdays[theDayAfterTomorrow]}</h6>
            </div>
            <div class="d-flex flex-column align align-items-center justify-content-justify-content-center pt-5">
            <img src="https:${weatherForcast.forecast.forecastday[2].day.condition.icon}"  width="50" height="50" alt="">
            <h5 class="text-white fw-bold">${weatherForcast.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C </h5>
            <p class="text-muted fw-bold">${weatherForcast.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C </p>
            <p class="ps-3 text-info">${weatherForcast.forecast.forecastday[2].day.condition.text}</p>
            </div>
          </div>`;
  document.getElementById("forcast-data").innerHTML = container;
}
