const apikey = "YOUR_API_KEY";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkweather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);

  if (response.status === 404) {
    document.querySelector(".invalidcity").style.display = "flex";
    document.querySelector("#items").style.display = "none";
    document.querySelector("#city").style.display = "none";
    return;
  }

  const data = await response.json();

  document.querySelector(".invalidcity").style.display = "none";
  document.querySelector("#items").style.display = "block";
  document.querySelector("#city").style.display = "flex";

  document.querySelector("#city p").innerHTML = data.name;
  document.querySelector(".temptature p").innerHTML =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".felllike p").innerHTML =
    Math.round(data.main.feels_like) + "°C";
  document.querySelector(".humidity .element p").innerHTML =
    data.main.humidity + "%";
  document.querySelector(".wind .element p").innerHTML =
    data.wind.speed + " km/h";

  const weatherimg = document.querySelector(".image img");
  const condition = data.weather[0].main;

  if (condition === "Clouds") weatherimg.src = "clouds.png";
  else if (condition === "Clear") weatherimg.src = "clear.png";
  else if (condition === "Rain") weatherimg.src = "rain.png";
  else if (condition === "Drizzle") weatherimg.src = "drizzle.png";
  else if (condition === "Mist") weatherimg.src = "mist.png";
  else if (condition === "Snow") weatherimg.src = "snow.png";
}

const searchbtn = document.querySelector("#searchbar button");
const searchbox = document.querySelector("#searchbar input");

searchbtn.onclick = () => {
  if (searchbox.value === "") {
    alert("Please enter a city name");
    return;
  }
  checkweather(searchbox.value);
};
