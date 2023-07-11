import React, { useEffect, useState } from "react";

import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import RingLoader from "react-spinners/RingLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null); //날씨데이타
  const cities = ["Dubai", "Tehran", "Tokyo", "Seoul"];
  const [city, setCity] = useState("current");
  const [loading, setLoading] = useState(true);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      //console.log("현재 내 위치는?", lat, lon);

      getWeatherByCurrentLocation(lat, lon);
    });
  };
  //좌표를 이용해서 날씨 API가져오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0d17f74ec0e3138fe53cff48e29df572&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };
  //도시이름으로 날씨 API가져오기
  const getWeatherByCity = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0d17f74ec0e3138fe53cff48e29df572&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    if (city === "current") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <>
      {loading ? (
        <div className="container">
          <RingLoader color="cyan" size={120} speedMultiplier={1} />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} />
        </div>
      )}
    </>
  );
}

export default App;
