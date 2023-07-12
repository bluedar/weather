import { useEffect, useState } from "react";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import FadeLoader from "react-spinners/FadeLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null); //날씨데이타
  const [city, setCity] = useState("current");
  const [loading, setLoading] = useState(true);
  const cities = ["sydney", "oslo", "baghdad", "paris"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      //console.log('현재 내 위치는?',lat,lon)

      getWeatherByCurrentLocation(lat, lon);
    });
  };

  //좌표를 이용해서 날씨API가져오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=83aeb80a15d50ee7a248d29575f07e8d&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  //도시이름으로 날씨API가져오기
  const getWeatherByCity = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=83aeb80a15d50ee7a248d29575f07e8d&units=metric`;
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
          <FadeLoader
            color="#0d6efd"
            height={40}
            margin={30}
            radius={10}
            speedMultiplier={2}
            width={6}
          />
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
