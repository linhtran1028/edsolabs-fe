import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import React from 'react';
import Image from './image/Image.png';
import {
  IconButton,
  Typography,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

const styles = () => ({
  mainNew: {
    margin: 0,
    padding: '10px',
  },
  closeButton: {
    position: 'absolute',
    right: '8px',
    top: '2px',
    color: '#df698c',
  },
  media: {
    height: '150px',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.mainNew} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
  },
  large: {
    width: '200px',
    height: '200px',
  },
}));

function Footer() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(process.env);
    setOpen(false);
  };

  const divStyle = {
    height: '300px',
    width: '200px',
    fontSize: '15px',
    marginLeft: '220px',
    marginTop: '-200px',
    color: '#df698c',
  };

  const introduce = {
    color: '#df698c',
  };

  const viewText = {
    marginTop: '-110px',
    color: '#df698c',
  };

  const button = {
    color: '#df698c',
  };
  return (
    <Box mt={2}>
      <Typography align="center" variant="subtitle1" component="h2">
        &copy; 2021 by FE class. Made with &hearts; by
        <Button onClick={handleClickOpen}>
          {process.env.REACT_APP_MADE_BY}
        </Button>
      </Typography>

      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            style={introduce}
          >
            About me
          </DialogTitle>

          <DialogContent dividers>
            <Avatar
              alt=" "
              src={Image}
              variant="rounded"
              className={classes.large}
            />
            <Typography>
              <p style={divStyle}>
                Name : Tran Thi Khanh Linh
                <br />
                Date of birth : 28/10/2000
                <br />
                Address : Nam Dinh
                <br />
                Education : VNU University of Science
                <br />
                (2018-2022)
                <br />
                Live Speech : "Anything but predictable"
              </p>
              <p style={viewText}>
                Contact <br />
                Email : ahlinhne@gmail.com <br />
                Instagram : ahlinh_ne
              </p>
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button autoFocus onClick={handleClose} style={button}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}

export default Footer;
