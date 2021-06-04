import React, { useState } from 'react';
import {
  Link,
  useHistory,
  Redirect,
} from 'react-router-dom';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import './App.css';
import API from './api';
import Name from './Name';
import Email from './Email';
import Password from './Password';
import useStyles from './useStyles';
import standardAPIOptions from './standardAPIOptions';

const api = new API('http://localhost:5005');

function Register() {
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

  function handleRegister(event) {
    event.preventDefault();
    const options = standardAPIOptions('POST');
    options.body = JSON.stringify({
      email: event.target.email.value,
      password: event.target.password.value,
      name: event.target.name.value,
    });

    api.makeAPIRequest('admin/auth/register', options).then((r) => {
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
          <Typography component="h1" variant="h5">
            CREATE ACCOUNT
          </Typography>
          <Snackbar open={errorDisplay} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="error">
              Email address already in use
            </Alert>
          </Snackbar>
          <form onSubmit={(e) => handleRegister(e)}>
            <Name />
            <Email />
            <Password />
            <Button
              type="submit"
              id="create"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ backgroundColor: '#4267B2' }}
            >
              CREATE
            </Button>
            <Grid container style={{ margin: '5% 0' }}>
              <Grid item>
                <Link to="/" className={classes.link}>
                  ALREADY HAVE AN ACCOUNT ?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
export default Register;
