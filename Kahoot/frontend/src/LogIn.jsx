import React, { useState } from 'react';
import './App.css';
import {
  Link,
  useHistory,
  Redirect,
} from 'react-router-dom';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import API from './api';
import Email from './Email';
import Password from './Password';
import useStyles from './useStyles';
import standardAPIOptions from './standardAPIOptions';

const api = new API('http://localhost:5005');

function LogIn() {
  const loggedIn = localStorage.getItem('token');
  const [errorDisplay, setErrorDisplay] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  if (loggedIn) {
    return (<Redirect to="/dashboard" />);
  }
  const handleClose = () => {
    setErrorDisplay(false);
  };
  function handleLogIn(event) {
    event.preventDefault();
    const options = standardAPIOptions('POST');
    options.body = JSON.stringify({
      email: event.target.email.value,
      password: event.target.password.value,
    });

    api.makeAPIRequest('admin/auth/login', options).then((r) => {
      console.log(options);
      if (r.token) {
        localStorage.setItem('token', r.token);
        history.push('/dashboard');
      } else {
        setErrorDisplay(true);
      }
    });
  }

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.login}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonSharpIcon style={{ fontSize: 40 }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          <Snackbar open={errorDisplay} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="error">
              Invalid email or password
            </Alert>
          </Snackbar>
          <form onSubmit={(e) => handleLogIn(e)}>
            <Email />
            <Password />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ backgroundColor: '#4267B2' }}
            >
              Sign In
            </Button>
            <Grid container style={{ margin: '5% 0' }}>
              <Grid item>
                <Link to="/register" className={classes.link}>
                  CREATE ACCOUNT
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
export default LogIn;
