/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';
import { useParams } from 'react-router';
import Container from '@material-ui/core/Container';
/* eslint-disable no-unused-vars */
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Card, Button } from '@material-ui/core';
import {
  Redirect, useHistory,
} from 'react-router-dom';
import { CountDown } from './CountDown';
import useStyles from './useStyles';
import API from './api';
import music from './music.mp3';
import standardAPIOptions from './standardAPIOptions';
/* eslint-disable no-unused-vars */
function embeddedURL(standardURL) {
  const res = standardURL.split('=');
  return `https://www.youtube.com/embed/${res[1]}`;
}

const api = new API('http://localhost:5005');

function compare(array1, array2) {
  for (let i = 0; i < array1.length; i += 1) {
    if (array1[i] + 1 !== array2[i]) return false; // we were off by 1 in our original code
  }
  return true;
}

function EnteredGame() {
  const params = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [question, setQuestion] = useState([]);
  const [counter, setCounter] = useState(0);
  const [music_, setMusic] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const song = new Audio(music);
  if (music_ === true) song.play();
  /*
  document.addEventListener('mousemove', (e) => {
    song.play();
  });
  */

  function sendAnswers(index) {
    const options = standardAPIOptions('PUT');
    const answerIds = [parseInt(index, 10)];
    Object.keys(selectedAnswers).filter((key) => selectedAnswers[key] === true)
      .map((eachID) => answerIds.push(parseInt(eachID, 10)));
    options.body = JSON.stringify({
      answerIds,
    });
    api.makeAPIRequest(`play/${params.playerID}/answer`, options)
      .then((r) => {
        setSelectedAnswers({
          ...selectedAnswers,
          [index]: (!selectedAnswers[index]),
        });
      });
  }

  const options = standardAPIOptions('GET');
  const [sessionStatus, setSessionStatus] = useState(false);

  const interval = setInterval(() => {
    if (sessionStatus === false) {
      api.makeAPIRequest(`play/${params.playerID}/status`, options)
        .then((r) => {
          if (r.started === true) {
            clearInterval(interval);
            setSessionStatus(true);
          }
        });
    }
  }, 1000);

  React.useEffect(() => {
    if (sessionStatus === true) {
      if (music_ === false) setMusic(true);
      api.makeAPIRequest(`play/${params.playerID}/question`, options)
        .then((r) => {
          if (r.error) { history.push(`/entered/session=${params.sessionID}/playerID=${params.playerID}/results`); return; }
          if (r.question.id !== question.id) setQuestion(r.question);
        });
    }
  }, [history, options, params.playerID, params.playerId,
    params.sessionID, question.id, sessionStatus, music_]);

  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  const endingTime = Date.parse(question.isoTimeLastQuestionStarted) + (question.time * 1000);
  const d = Math.floor((endingTime - currentTime) / 1000);
  // console.log(d);

  React.useEffect(() => {
    setSelectedAnswers({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    });
  }, [question]);

  React.useEffect(() => {
    // eslint-disable-next-line no-shadow
    let interval = null;
    if (sessionStatus === true) {
      interval = setInterval(() => {
        /* eslint-disable no-shadow */
        setCounter((counter) => counter + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStatus]);

  return (
    <>
      {sessionStatus ? (
        <Container component="main" maxWidth="xs" className={classes.login}>
          <CssBaseline />
          <Typography style={{ fontWeight: 'bold' }}>
            <CountDown value={d} />
          </Typography>
          <Card style={{ fontSize: '40px', padding: '10%', textAlign: 'center' }}>
            <Typography style={{ fontSize: '70%', marginBottom: '4%' }}>
              {question.name}
              ?
            </Typography>
            {question.answers
              ? (

                Object.keys(question.answers).filter((key) => {
                  if (question.answers[key].length === 0) return false;
                  // if answer is empty, dont include it (user made question with < 6 answers)
                  return true;
                }).map((key) => (
                  <Grid container spacing={3}>
                    <Grid item xs style={{ display: 'flex', flexDirection: 'column' }}>
                      <Button
                        name="option"
                        style={{
                          display: 'block', margin: '3%', border: '1px solid', backgroundColor: selectedAnswers[key] ? '#42c8f5' : '',
                        }}
                        onClick={() => sendAnswers(key)}
                      >
                        {key}
                        .
                        {question.answers[key]}
                      </Button>
                    </Grid>
                  </Grid>
                  // eslint-disable-next-line no-param-reassign
                ))
              ) : (' ')}
          </Card>
          {question.video
            ? (
              <iframe
                src={embeddedURL(question.video)}
                frameBorder="0"
                title="video"
              />
            ) : (' ')}
          {question.photo
            ? (
              <img src={question.photo} alt="related to quiz question" style={{ height: '55%', width: '110%' }} />
            ) : (' ')}
          <Dialog aria-labelledby="customized-dialog-title" open={d < 0} style={{ width: '100%' }}>
            <DialogTitle id="customized-dialog-title"> Correct Answers were: </DialogTitle>
            <Typography variant="body2" color="textSecondary" component="p" align="center">
              {question.correct ? (
                Object.keys(question.correct).map((key) => (
                  <Typography>
                    {question.correct[key]}
                    .
                    {question.answers[question.correct[key]]}
                  </Typography>
                ))
              ) : (' ')}
              {question.correct
                && compare(Object.keys(question.correct)
                  .map((id) => parseInt(id, 10))
                  .sort(),
                Object.keys(selectedAnswers).filter((key) => selectedAnswers[key] === true)
                  .map((id) => parseInt(id, 10))
                  .sort()) ? (

                    <Typography syle={{ color: 'green' }}>
                      Correct!
                    </Typography>

                ) : (<Typography syle={{ color: 'red' }}> Your answer was wrong</Typography>)}
            </Typography>
          </Dialog>
        </Container>

      ) : (
        <>
          <Typography> Session has not started yet</Typography>

        </>
      )}
    </>
  );
}

export default EnteredGame;
