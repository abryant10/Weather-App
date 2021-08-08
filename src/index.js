import './style.css';

const location = document.querySelector('.location');
const weatherDescription = document.querySelector('.weatherDescription');
const currentTemp = document.querySelector('.currentTemp');
const feelsLike = document.querySelector('.feelsLike');
const wind = document.querySelector('.wind');
const form = document.getElementById('searchBarForm');
const searchBar = document.getElementById('searchBar');

const populateError = function populateError() {
  location.innerHTML = 'Location not recognised, please try again';

  weatherDescription.innerHTML = '';

  currentTemp.innerHTML = '';

  feelsLike.innerHTML = '';

  wind.innerHTML = '';
};

const getData = async function getData(loc) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=imperial&appid=49678917ded9e2b299f94f0ea74ded42`);

  if (!response.ok) {
    populateError();
    return false;
  }
  const data = await response.json();
  return data;
};

const populatePage = async function populatePage(loc) {
  const data = await getData(loc);

  if (!data) return;

  location.innerHTML = data.name;

  weatherDescription.innerHTML = data.weather[0].description;

  currentTemp.innerHTML = `${Math.round(data.main.temp)}°F`;

  feelsLike.innerHTML = `Feels Like ${Math.round(data.main.feels_like)} °F`;

  wind.innerHTML = `Wind ${data.wind.speed} MPH`;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  populatePage(searchBar.value);
});

populatePage('dallas');
