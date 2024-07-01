import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import {
  IoMdCloudy,
  IoMdRainy,
  IoMdSnow,
  IoMdSunny,
  IoMdThunderstorm,
} from "react-icons/io";
import { BsCloudDrizzleFill, BsCloudHaze2Fill } from "react-icons/bs";
const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Dhaka");

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
      import.meta.env.VITE_APIKEY
    }`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  // loading animation

  if (!data) {
    return <div className="loader"></div>;
  }

  // setting the icon according to weather

  let icon;

  switch (data.weather[0].main) {
    case "Cloudy":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  return (
    <>
      <h1 className="text-6xl">{icon}</h1>
    </>
  );
};

export default App;
