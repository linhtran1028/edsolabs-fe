import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputBase, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  mainNew: {
    margin: '0px auto',
    paddingTop: '100px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 20,
    },
  },

  title: {
    textAlign: 'center',
    fontFamily: 'Arial',
  },

  input: {
    maxWidth: 500,
    margin: '0px auto',
    padding: '4px 10px',
    border: '1px solid #ccc',
    borderRadius: 40,
    '&:hover': {
      backgroundColor: '#fff',
    },
  },

  inputFocus: {
    boxShadow:
      'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
  },

  inputError: {
    color: 'red',
    paddingLeft: 32,
  },
}));

function Search(props) {
  const classes = useStyles();

  const { changeCity } = props;

  const [valueSearch, setValueSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    changeCity(valueSearch);
  };

  return (
    <Grid className={classes.mainNew}>
      <h1 className={classes.title}>Edsolabs 5-Day Forecast</h1>
      <form className={classes.input} onSubmit={handleSubmit}>
        <InputBase
          placeholder="Nhập thành phố muốn xem"
          fullWidth
          variant="outlined"
          value={valueSearch}
          onChange={(e) => setValueSearch(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </form>
    </Grid>
  );
}

export default Search;
