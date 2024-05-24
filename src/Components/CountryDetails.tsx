import React, { FormEvent, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./CountryDetails.css";
import { Loading } from "../baseComponents/Loading/Loading";
import Waves from "./FooterWas/Waves";

type InitiProps = {
  name: string;
};

interface InitCountry {
  capital: string[];
  population: number;
  latlng: number[];
  flags: {
    svg: string;
  };
}

interface InitCountryWeatherInfo {
  temperature: number;
  weather_icons: string[];
  wind_speed: number;
  precip: number;
}

export const CountryDetails: React.FC = () => {
  const { name } = useParams<InitiProps>();

  const [countryInfo, setCountryInfo] = useState<InitCountry>();
  const [capitalName, setCapitalName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState<InitCountryWeatherInfo>();
  const [countryApiError, setCountryApiError] = useState<Boolean>(false);
  const [weatherApiError, setWeatherApiError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);

  const navigate = useLocation();

  const getCountryData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const data = response.data;
      setCountryInfo(data[0]);
      setCapitalName(data[0].capital[0]);
    } catch (error) {
      setCountryApiError(true);
    }
  }, [name]);

  useEffect(() => {
    getCountryData();
  }, [getCountryData]);

  const getWeatherDetails = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=60774ad1b455f3cff7d3f8a273f488f5&query=${capitalName}`
      );
      const data = response.data;
      setWeatherInfo(data.current);
      setLoading(false);
    } catch (error) {
      setWeatherApiError(true);
    }
  };

  const getBackToHome = (e: FormEvent) => {
    e.preventDefault();
    document.location = "/";
  };

  return (
    <>
      <p className="back" onClick={() => (document.location = "/")}>
        Back To Home
      </p>
      <h2 style={{ textAlign: "center" }}> Country Details</h2>
      <div className="div-root">
        <div className="div-items1">
          {countryInfo ? (
            <div data-testid="country-info">
              <p>Capital: {countryInfo.capital[0]}</p>
              <p>Population: {countryInfo.population}</p>
              <p>
                Latitude: {countryInfo.latlng[0]}
                <sup>o</sup>
              </p>
              <p>
                Longitude: {countryInfo.latlng[1]}
                <sup>o</sup>
              </p>
              <img
                src={countryInfo.flags.svg}
                height="100px"
                width={200}
                alt=""
              />

              <br />
              <br />
            </div>
          ) : (
            <div>
              {" "}
              {countryApiError ? (
                <>
                  <p>Country info not found!</p>
                  <p>Please try aging</p>
                  <button onClick={getBackToHome}>get back to home</button>
                </>
              ) : (
                <Loading />
              )}
            </div>
          )}
        </div>

        <div className="div-items2">
          <button onClick={getWeatherDetails}>Capital Weather</button>
          {weatherInfo ? (
            <div className="weather-content" data-testid="weather-details">
              <br />
              <h3>Weather Info</h3>
              <br />
              <img src={weatherInfo.weather_icons[0]} alt="Weather Icon" />
              <p>
                Temperature: {weatherInfo.temperature}
                <sup>o</sup>
              </p>
              <p>Wind Speed: {weatherInfo.wind_speed}</p>
              <p>Precip: {weatherInfo.precip}</p>
            </div>
          ) : (
            <div>
              {weatherInfo ? (
                <p>Weather info not found. Please try again!{weatherInfo}</p>
              ) : (
                <p>{loading ? <Loading /> : ""}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <Waves />
    </>
  );
};
