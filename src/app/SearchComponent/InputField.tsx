"use client"; // This is a client component 👈🏽
import Image from "next/image";
import { useState } from "react";
import HistoricalLogo from "../../../public/images/historical_cultural.png";
import { mockData } from "../mockUpData/mockData";

function InputField() {
  const [cityName, setCityName] = useState("");
  const [generalCityInformation, setGeneralCityInformation] =
    useState(mockData);
  const [showInfo, setShowInfo] = useState(false);
  const [requestActive, setRequestActive] = useState(false);

  const handleCityNameChange = async (e: any) => {
    setCityName(e.target.value);
  };

  const submitCityName = async (e: any) => {
    e.preventDefault();
    // const res = await chatCompletion.getGeneralInformation(cityName);

    //Mock API Call:
    setRequestActive(true);
    setTimeout(() => {
      setShowInfo(true);
      setRequestActive(false);
    }, 2000);
  };

  const renderParagraphs = (text: String) => {
    return text.split("\n\n").map((paragraph, index) => (
      <span key={index}>
        {paragraph}
        <br />
        <br />
      </span>
    ));
  };

  return (
    <>
      <div
        className={`flex justify-center items-center ${
          !showInfo ? "min-h-screen" : "p-10"
        }`}
        style={{ border: "3px solid red" }}
      >
        <form onSubmit={submitCityName} className="flex flex-col items-center">
          <input
            className={`text-xl py-5 px-3 text-black rounded-lg mb-4
            ${!showInfo ? "" : "py-3 px-2 text-lg text-black"}
            `}
            placeholder="Budapest, Hungary"
            value={cityName}
            onChange={handleCityNameChange}
          />
          <button
            className={`bg-white p-6 text-xl rounded-lg ${
              cityName.length > 0 ? "text-green-500" : "text-gray-400"
            }
            ${!showInfo ? "" : "p-3 text-sm text-black"}
            `}
            disabled={cityName.length === 0}
          >
            SEARCH
          </button>
        </form>
      </div>
      {/* {requestActive && (
        <div className="">
          <h4 className="text-pink-400 text-lg text-center">
            Please be Patient. SEGWAI is fetching all necessary Data.
          </h4>
        </div>
      )} */}
      {showInfo &&
        generalCityInformation.map((entry) => {
          return (
            <div
              key={entry.data.id}
              className="w-full mx-auto px-6 text-sm sm:w-3/4 
          sm:px-10 sm:text-base md:w-3/4 md:px-4 md:text-lg my-10"
            >
              <h3 className="mb-5 text-2xl font-bold leading-5 ">
                {entry.aspect}
              </h3>

              <Image
                src={HistoricalLogo}
                alt="Logo for Historical Sites"
                className="w-full mb-10"
              />
              <p className="leading-8 text-xl px-6">
                {renderParagraphs(entry.data.choices[0].message.content)}
              </p>
            </div>
          );
        })}
    </>
  );
}

export default InputField;
