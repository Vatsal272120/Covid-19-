import React, { useState, useEffect } from "react";

import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";

import Infobox from "./Components/Infobox";

import numeral from "numeral";
import "leaflet/dist/leaflet.css";
import Map from "./Components/Map";
import Table from "./Components/Table";
import { prettyPrintStat, sortData } from "./Components/Util";

function App() {
  // country list
  const [countries, setcountries] = useState([]);

  // useSelection
  const [selectedCountry, setselectedCountry] = useState("worldwide");

  // data from the countries
  const [countryData, setcountryData] = useState({});

  // cases type
  const [casesType, setCasesType] = useState("cases");

  //table data
  const [tableData, settableData] = useState([]);

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

          let sortedData = sortData(data);

          settableData(sortedData);

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

  console.log("country Info", countryData);

  console.log("table data", tableData);
  return (
    <div className='app'>
      <div className='app__left'>
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

        <div className='app__stats'>
          <Infobox
            onClick={(e) => setCasesType("cases")}
            title='Active Cases'
            cases={prettyPrintStat(countryData.active)}
            total={numeral(countryData.cases).format("0.0a")}
          />
          <Infobox
            onClick={(e) => setCasesType("recovered")}
            title='Recovered Cases'
            total={numeral(countryData.recovered).format("0.0a")}
            cases={prettyPrintStat(countryData.todayRecovered)}
          />

          <Infobox
            onClick={(e) => setCasesType("deaths")}
            title='Deaths'
            total={numeral(countryData.deaths).format("0.0a")}
            cases={prettyPrintStat(countryData.todayDeaths)}
          />
        </div>
        <Map />
      </div>

      <Card className='app__right'>
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />

          <h3>Worldwide new Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
