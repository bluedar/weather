import React from "react";

const WeatherBox = ({ weather }) => {
  //console.log("WeatherBox 컴포넌트 내의 weather", weather);
  const iconNow = weather?.weather[0].icon;
  return (
    <div className="weather-box">
      <h2 className="h4 text-light">{weather?.name}</h2>
      <h1 className="text-light fw-bold">
        {weather?.main.temp}℃ / {weather?.main.humidity}%
      </h1>
      <div className="text-light fw-bold">
        {weather?.weather[0].description}
      </div>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${iconNow}@2x.png`}
          alt=""
        />
      </div>
    </div>
  );
};

export default WeatherBox;
//{weather && weather.name}
// {weather?.name}
