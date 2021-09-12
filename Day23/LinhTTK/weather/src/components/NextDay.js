import { Box, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import moment from 'moment';

const useStyles = makeStyles({
  mainNew: {
    maxWidth: '700px',
    marginTop: '20px',
    margin: 'auto',
  },
  item: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: '20px',
  },
  media: {
    height: '80px',
    width: '80px',
  },
});

function NextDay(props) {
  const classes = useStyles();

  const { weatherFiveDay } = props;

  const dayOfWeek = (day) => {
    const arrDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return arrDays[day - 1];
  };

  return (
    <Box className={classes.mainNew}>
      <Typography align="left" variant="h5">
        Next 3 day forecast
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {weatherFiveDay.map((day, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            flexDirection="column"
            mt={2}
            py={1}
            className={classes.item}
          >
            <Typography variant="body" component="p">
              {dayOfWeek(moment(day.date).isoWeekday())}
            </Typography>

            <Typography variant="body" component="p">
              {moment(day.date).format('DD/MM')}
            </Typography>

            <CardMedia
              className={classes.media}
              image={day.day.condition.icon}
              title={day.day.condition.text}
            />

            <p>{day.day.mintemp_c}&deg;C</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default NextDay;
