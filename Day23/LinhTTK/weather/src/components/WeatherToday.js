import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  mainNew: {
    width: 500,
    maxWidth: 500,
    transition: 'all 1s ease-in',
    marginTop: 20,
    margin: 'auto',
    borderRadius: ' 20px',
  },
  media: {
    height: 100,
    width: 100,
  },
});

function WeatherToday(props) {
  const classes = useStyles();
  const { weatherToDay } = props;

  if (Object.keys(weatherToDay).length === 0) {
    return (
      <>
        <Typography align="center" variant="p" component="p">
          What a nice day
        </Typography>
      </>
    );
  }

  return (
    <Card className={classes.mainNew}>
      <CardContent>
        <Typography align="center" variant="h6" component="h2">
          Today's Weather in {weatherToDay.location.name},
          {weatherToDay.location.country}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-around"
          flexWrap="wrap"
          alignItems="center"
        >
          <Box px={1}>
            <CardMedia
              className={classes.media}
              image={weatherToDay.current.condition.icon}
              title={weatherToDay.current.condition.text}
            />
          </Box>
          <Box px={1}>
            <p>{weatherToDay.current.condition.text}</p>
            <p>{weatherToDay.current.temp_c} &deg;C</p>
          </Box>
          <Box px={1}>
            <p>Wind: {weatherToDay.current.wind_kph} kmph</p>
            <p>Precip: {weatherToDay.current.precip_mm} mm</p>
            <p>Pressure: {weatherToDay.current.pressure_mb} mb</p>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WeatherToday;
