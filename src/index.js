import './style.css';
import {
  location,
  weatherDescription,
  currentTemp,
  highLow,
} from './dom';

const KtoF = function KtoF(k) {
  const f = Math.round((k - 273.15) * (9 / 5) + 32);
  return f;
};

const getData = async function getData(loc) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=49678917ded9e2b299f94f0ea74ded42`);

  const data = await response.json();

  console.log(data);

  location.innerHTML = data.name;

  weatherDescription.innerHTML = data.weather[0].description;

  currentTemp.innerHTML = KtoF(data.main.temp);

  highLow.innerHTML = `H:${KtoF(data.main.temp_max)} L:${KtoF(data.main.temp_min)}`;
};

getData('dallas');
