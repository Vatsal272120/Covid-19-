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
  const [countries, setCountries] = useState([]);
  const [countryInfo, setcountryInfo] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((data) => data.json())
        .then((info) => {
          const countries = info.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  console.log(` the country info:`, countryInfo);

  return (
    <div className='app'>
      <div className='app__header'>
        {" "}
        <h1>Covid-19 Tracker</h1>
        <FormControl classname='app__dropdown'>
          <Select variant='outlined' value='abs'>
            <MenuItem value='worldwide'>WorldWide</MenuItem>
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
