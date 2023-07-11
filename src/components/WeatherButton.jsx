import React from "react";
import Button from "react-bootstrap/Button";

const WeatherButton = ({ cities, setCity }) => {
  return (
    <div className="weather-button">
      <Button variant="danger" onClick={() => setCity("current")}>
        Current Location
      </Button>
      {cities.map((city, index) => (
        <Button
          key={index}
          onClick={() => setCity(city)}
          variant="outline-light"
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
