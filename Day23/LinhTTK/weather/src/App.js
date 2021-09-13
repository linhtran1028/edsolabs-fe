import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import WeatherToday from './components/WeatherToday';
import NextDay from './components/NextDay';
import Footer from './components/Footer';
import {
  Container,
  Box,
  CircularProgress,
  Typography,
} from '@material-ui/core';

function App() {
  const [city, setCity] = useState('');
  const [cityIncorrect, setCityIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weatherToDay, setWeatherToDay] = useState({});
  const [weatherDays, setWeatherDays] = useState([]);
  const [hex] = useState('#ffffff');
  const useStyle = () => ({
    container: {
      height: '100%',
      minHeight: '100vh',
      transition: ' all 1000s ease-in',
    },
  });
  const classes = useStyle();
  useEffect(() => {
    setLoading(true);
    setCityIncorrect(false);
    if (city.trim() === '') {
      setWeatherDays([]);
      setWeatherToDay({});
      setLoading(false);
    } else {
      axios
        .get(
          `${process.env.REACT_APP_API_WEATHER}${process.env.REACT_APP_KEY}&q=${city}&days=3&aqi=no&alerts=no`
        )
        .then(function (response) {
          setWeatherToDay(response.data);
          setWeatherDays(response.data.forecast.forecastday);
          setLoading(false);
        });
    }
  }, [city]);

  const changeCity = (value) => {
    setCity(value);
  };

  useEffect(() => {
    axios
      .get('https://ipinfo.io/json?token=1a6982852a0e69')
      .then((response) => {
        setCity(response.data.city);
      });
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Search
        city={city}
        changeCity={changeCity}
        cityIncorrect={cityIncorrect}
      />

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          alignItems="center"
        >
          <CircularProgress color="dark" />
          <Typography align="center" variant="p" component="div">
            Getting information, please wait...
          </Typography>
        </Box>
      )}

      <WeatherToday weatherToDay={weatherToDay} hex={hex} />
      {weatherDays.length !== 0 && (
        <NextDay weatherFiveDay={weatherDays} hex={hex} />
      )}

      <Footer />
    </Container>
  );
}

export default App;
