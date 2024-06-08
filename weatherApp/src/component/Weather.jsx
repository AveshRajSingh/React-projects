import React, { useEffect, useRef, useState } from "react";
import clear from "../assets/clear.png";
import search from "../assets/search.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import "./Weather.css";

const Weather = () => {
  const cityRef = useRef();
  const apiKey = "3fbfd21b050f3bb6449616722ab5a5e4";

  let [resultData, setResultData] = useState({});
  const allIcon = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow
  };

  const searchFunc = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    let icon = allIcon[data.weather[0].icon] || clear
    setResultData({
      temprature: Math.floor(data.main.temp),
      humidity: data.main.humidity,
      cityName: data.name,
      windSpeed: data.wind.speed,
      icons:icon
    });
  };
  console.log(resultData.windSpeed);
  useEffect(() => {
    searchFunc("London");
  }, []);
  return (
    <div className="weather">
      <div className="search">
        <input type="text" placeholder="search" ref={cityRef} />
        <img
          src={search}
          alt=""
          onClick={() => searchFunc(cityRef.current.value)}
        />
      </div>
      <div className="city">
        <img src={resultData.icons} alt="" />
        <h1>{resultData.cityName}</h1>
        <h1>{resultData.temprature}°C</h1>
      </div>
      <div className="bottom">
        <div className="left-side">
          <img src={humidity} alt="" />
          <p>{resultData.humidity}</p>
        </div>
        <div className="right-side">
          <img src={wind} alt="" />
          <p>{resultData.windSpeed}km/h</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
