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
  //gets the list of all the countries and data for worldwide cases
  const [countries, setcountries] = useState([]);

  return (
    <div className='app'>
      <div className='app__header'>
        {" "}
        <h1>Covid-19 Tracker</h1>
        <FormControl>
          <Select variant='outlined'>
            <MenuItem value='worlwide'>All</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='app__stats'></div>
    </div>
  );
}

export default App;
