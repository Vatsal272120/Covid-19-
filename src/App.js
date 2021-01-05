import React, { useState, useEffect } from "react";

import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";

function App() {
  //gets the list of all the countries
  const [countries, setcountries] = useState([]);
  // selected country from user
  const [country, setInputCountry] = useState("worldwide");
  // data from all countries
  const [countryInfo, setCountryInfo] = useState({});

  // get all country info
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((reponse) => reponse.json())
      .then((data) => setCountryInfo(data));
  }, []);

  useEffect(() => {
    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setcountries(countries);
        });
    };
    getCountryData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
      });
  };
  //console.log(countryInfo);

  return (
    <div className='app'>
      <div className='app__header'>
        {" "}
        <h1>Covid-19 Tracker</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' value={country} onChange={onCountryChange}>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className='app__stats'></div>
    </div>
  );
}

export default App;
