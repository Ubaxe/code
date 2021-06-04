/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';
import { useParams } from 'react-router';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {
  useHistory,
} from 'react-router-dom';
import useStyles from './useStyles';
import standardAPIOptions from './standardAPIOptions';
import API from './api';

const api = new API('http://localhost:5005');

function Play() {
  const session = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [errorDisplay, setErrorDisplay] = useState(false);

  const handleClose = () => {
    setErrorDisplay(false);
  };

  function playGame(e) {
    e.preventDefault();
    const options = standardAPIOptions('POST');
    options.body = JSON.stringify({
      name: e.target.name.value,
    });
    api.makeAPIRequest(`play/join/${e.target.sessionID.value}`, options)
      .then((r) => {
        if (r.error === undefined) {
          history.push(`/entered/session=${e.target.sessionID.value}/playerID=${r.playerId}`);
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
          <Snackbar open={errorDisplay} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="error">
              Invalid session ID
            </Alert>
          </Snackbar>
          <form onSubmit={(e) => playGame(e)}>
            <Typography component="h1" variant="h5">
              Session ID
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="sessionID"
              defaultValue={session.sessionID}
              autoFocus
            />

            <Typography component="h2" variant="h5">
              Name
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ backgroundColor: '#4267B2' }}
            >
              Enter Game
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
export default Play;
