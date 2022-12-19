import "./App.css";
import { useState } from "react";

// its a free account, do what thou wilt
const apiKey = "ff4111189446487088f222006221812";
const baseUrl = "http://api.weatherapi.com/v1/forecast.json";

function App() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(
      `${baseUrl}?key=${apiKey}&q=${input}&days=2&aqi=no&alerts=no`
    );

    const result = await res.json();

    setLoading(false);

    setData(result.forecast.forecastday[1].day);
  };
  return (
    <div className="App">
      <main className="min-h-screen bg-gradient-to-b from-indigo-600 to-indigo-900 flex justify-center items-center">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <h1 className="text-white text-5xl font-bold text-center">
            Will it rain tomorrow?
          </h1>
          {data ? (
            <div className="flex flex-col text-center">
              <span className="text-white font-semibold text-2xl">
                {data.daily_chance_of_rain > 0
                  ? `There is a ${data.daily_chance_of_rain}% chance of rain`
                  : "No :)"}
              </span>
              <span className="text-white/50 font-semibold text-lg mt-10">
                Here&apos;s the specifics
              </span>
              <div className="w-full p-4 rounded-md bg-white/10 gap-y-2 text-white flex justify-between items-center mt-5">
                <span className="">Condition</span>
                <div className="font-bold flex items-center gap-2">
                  <img src={data.condition.icon} className="w-7 h-7" />
                  {data.condition.text}
                </div>
              </div>
              <div className="w-full p-4 rounded-md bg-white/10 gap-y-2 text-white flex justify-between items-center mt-5">
                <span className="">Low</span>
                <span className="font-bold">
                  {Math.round(data.mintemp_f)}
                  <sup>o</sup>
                </span>
              </div>
              <div className="w-full p-4 rounded-md bg-white/10 gap-y-2 text-white flex justify-between items-center mt-5">
                <span className="">High</span>
                <span className="font-bold">
                  {Math.round(data.maxtemp_f)}
                  <sup>o</sup>
                </span>
              </div>
              <div className="w-full p-4 rounded-md bg-white/10 gap-y-2 text-white flex justify-between items-center mt-5">
                <span className="">Humidity</span>
                <span className="font-bold">{data.avghumidity}%</span>
              </div>
              <div className="w-full p-4 rounded-md bg-white/10 gap-y-2 text-white flex justify-between items-center mt-5">
                <span className="">Precipitation (Inches)</span>
                <span className="font-bold">{data.totalprecip_in}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-5">
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                className="block w-full rounded-md shadow-sm text-white focus:ring-0 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white/10 p-5"
                placeholder="Zip Code"
                maxLength={10}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                onClick={() => handleSubmit()}
                type="button"
                className="inline-flex justify-center items-center py-5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0"
              >
                {loading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 animate-spin"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                ) : (
                  `Let's find out!`
                )}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
