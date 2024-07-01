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
import {
  BsCloudDrizzleFill,
  BsCloudHaze2Fill,
  BsEye,
  BsThermometer,
  BsWater,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Chittagong");

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${
      import.meta.env.VITE_APIKEY
    }`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  // loading animation

  if (!data) {
    return <div className="loader "></div>;
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

  // date
  const date = new Date();

  return (
    <>
      <div
        className="w-full h-screen bg-gradientBg bg-no-repeat 
     bg-cover bg-center flex flex-co items-center justify-center px-4 lg:px-0"
      >
        <form>
          <div></div>
        </form>
        {/* card */}
        <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
          <div>
            {/* top */}
            <div className=" flex items-center gap-x-5">
              {/* icon */}
              <div className="text-[87px]">{icon}</div>
              {/* country */}
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              {/* date */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
            {/*  body*/}
            <div className="my-20">
              <div className="flex justify-center items-center">
                {/* temp */}
                <div className="text-[144px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                {/* temp icon */}
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* description */}
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
            {/* bottom */}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility{" "}
                    <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels Like{" "}
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity
                    <span className="ml-2">{data.main.humidity}</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind
                    <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
