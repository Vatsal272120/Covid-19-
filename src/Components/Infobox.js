import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../Stylesheets/InfoBox.css";

const Infobox = ({ title, cases, total }) => {
  return (
    <div className='infoBox'>
      <Card>
        <CardContent>
          <Typography color='textSecondary' gutterBottom>
            {title}
          </Typography>
          <h2 className='infoBox__cases'>{cases}</h2>
          <Typography color='textSecondary' className='infoBox__total'>
            {total}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Infobox;
