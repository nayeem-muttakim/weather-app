import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import {
  IoMdCloudy,
  IoMdRainy,
  IoMdSearch,
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
import { ImSpinner8 } from "react-icons/im";
const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Chittagong");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    if (input.value === "") {
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = "";

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`;
    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);

          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 2000);

    return ()=>clearTimeout(timer)
  }, [errorMessage]);
  // loading animation

  if (!data) {
    return (
      <div className="loader">
        {/* <ImSpinner8 className="text-5xl animate-spin" /> */}
      </div>
    );
  }

  // setting the icon according to weather

  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
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
     bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0"
      >
        {errorMessage&&<div>{errorMessage.response.data.message}</div>}
        <form
          className={`${
            animate ? "animate-shake" : "animate-none"
          } h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}
        >
          <div className="h-full relative flex items-center justify-between p-2">
            <input
              onChange={(e) => handleInput(e)}
              className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
              type="text"
              name="location"
              placeholder="Search by city or country"
            />
            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"
            >
              <IoMdSearch className="text-2xl text-white" />
            </button>
          </div>
        </form>

        {/* card */}
        <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
          {loading ? (
            <div className="size-full flex justify-center items-center">
              <ImSpinner8 className="text-5xl text-white animate-spin" />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
};

export default App;
