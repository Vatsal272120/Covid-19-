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
  // country list
  const [countries, setcountries] = useState([]);

  // useSelection
  const [selectedCountry, setselectedCountry] = useState("worldwide");

  // data from the countries
  const [countryData, setcountryData] = useState({});

  // gets all worldwide data

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setcountryData(data));
  }, []);

  // get country list
  useEffect(() => {
    const getCountrylist = async () => {
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

    getCountrylist();
  }, []);

  // gets data for the user selected country - when the user selects the country, remove the previos selection from the countrydata and populate it with new one.

  const getCountryData = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setselectedCountry(countryCode);
        setcountryData(data);
      });
  };

  return (
    <div className='app'>
      <div className='app__header'>
        {" "}
        <h1>Covid-19 Tracker</h1>
        <FormControl className='app__dropdown'>
          <Select
            variant='outlined'
            value={selectedCountry}
            onChange={getCountryData}>
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
