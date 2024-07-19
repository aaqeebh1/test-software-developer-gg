const placeName = document.querySelector(
  `[data-testid="place-summary-region"]`
);
const weatherElement = document.createElement("div");
const url =
  "https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=a2ef86c41a&lat=27.987850&lon=86.925026";

//  Fetch weather data
const getWeather = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error(error);
  }
};

// display weather data
function displayWeather(weatherData) {
  if (!weatherData) return;

  const existingWeatherElement = document.getElementById("weather-info");
  if (existingWeatherElement) {
    existingWeatherElement.remove();
  }

  weatherElement.id = "weather-info";
  weatherElement.innerHTML = `
        <p style="margin: 0 10px 0 0;">${Math.round(
          weatherData.list[0].main.temp
        )}°C</p> 
    <p style="margin: 0;">${weatherData.list[0].weather[0].main}</p>
        `;

  weatherElement.style.display = "flex";
  weatherElement.style.flexDirection = "row";
  weatherElement.style.alignItems = "center";

  placeName.insertAdjacentElement("afterend", weatherElement);
}

// A/B test
function initABTest() {
  let group = localStorage.getItem("weatherTestGroup");
  if (group === null) {
    group = Math.random() < 0.5 ? "A" : "B";
    localStorage.setItem("weatherTestGroup", group);
  }

  return group;
}

const testGroup = initABTest();

// Display weather data based on test group === "B"

if (testGroup === "B") {
  getWeather();
} else {
  console.log("User in control group, not showing weather");
}
