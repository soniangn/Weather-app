//Current date and time display
let now = new Date();
let date = document.querySelector("#date");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`; 
  }

date.innerHTML = `${day} ${hours}:${minutes}`;

//Display weather
function displayCityWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name; 

  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = temperature; 

  let description = document.querySelector("#sky");
  description.innerHTML = response.data.weather[0].description;

  let realTemp = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector(".realfeels");
  feelsLike.innerHTML = `Feels like ${realTemp}°C`;

  let searchedHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${searchedHumidity}%`;

  let maxTemp = Math.round(response.data.main.temp_max);
  let searchedMaxTemp = document.querySelector(".max-temp");
  searchedMaxTemp.innerHTML = `${maxTemp}°C`;

  let minTemp = Math.round(response.data.main.temp_min);
  let searchedMinTemp = document.querySelector(".min-temp");
  searchedMinTemp.innerHTML = `${minTemp}°C`;

  let searchedWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${searchedWind} km/h`;
}

//Search city
function citySearch(city) {
  let apiKey = "a44f539b1a53685a653d0537b8f7649c";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(displayCityWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  citySearch(city); 
}

let searchCity = document.querySelector("#city-form");
searchCity.addEventListener("submit", handleSubmit);

//Click current city
function currentCityPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a44f539b1a53685a653d0537b8f7649c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayCityWeather);
}

function handleButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCityPosition);
}

let currentCityButton = document.querySelector("#currentcity-form");
currentCityButton.addEventListener("click", handleButton);

citySearch("Paris");
