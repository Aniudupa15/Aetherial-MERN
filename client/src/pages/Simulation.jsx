import React from 'react';
function WeatherApp() {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
const buttonClass = "bg-zinc-800 text-white font-bold py-2 px-4 rounded hover:bg-zinc-600";
const containerClass = "bg-zinc-700 p-6 rounded-lg shadow-lg max-w-sm";
const imageClass = "rounded-lg mb-4";
}
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation not supported");
      }
}
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Make API call to OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<4fa1cf6da64e474b21a9f6116743a712>&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        console.log(data);
      })
      .catch(error => console.log(error));
  }
  function error() {
    console.log("Unable to retrieve your location");
  }
const MotorcycleComponent = () => {
  return (
    <div className="bg-black flex items-center justify-center h-screen">
      <div className={containerClass}>
        <iframe src=" " className={imageClass} />
        <button className={buttonClass} onClick={getLocation}>
          GET LOCATION
        </button>
      </div>
      {location && !weather ? <p>Loading weather data...</p> : null}
      {weather ? (
        <div>
          <p>Location: {weather.name}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : null}
    </div>
  );
}

export default MotorcycleComponent;