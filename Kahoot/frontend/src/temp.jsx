/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.css';
import { useParams } from 'react-router';
import Container from '@material-ui/core/Container';
/* eslint-disable no-unused-vars */
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Card, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './useStyles';
import API from './api';
import standardAPIOptions from './standardAPIOptions';
/* eslint-disable no-unused-vars */
function embeddedURL(standardURL) {
  const res = standardURL.split('=');
  return `https://www.youtube.com/embed/${res[1]}`;
}

const api = new API('http://localhost:5005');

function EnteredGame() {
  const params = useParams();
  const classes = useStyles();
  const [question, setQuestion] = useState([]);
  const [counter, setCounter] = useState(1000);
  const [noMoreTime, setNoMoreTime] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  React.useEffect(() => {
    const options = standardAPIOptions('GET');
    api.makeAPIRequest(`play/${params.playerID}/question`, options)
      .then((r) => {
        setQuestion(r.question);
      });
  }, [params.playerID]);

  if (noMoreTime === false) {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const endingTime = Date.parse(question.isoTimeLastQuestionStarted) + (question.time * 1000);
    const timeRemaining = Math.floor((endingTime - currentTime) / 1000);
    console.log(timeRemaining);
    if (counter === 1000) setCounter(timeRemaining);
    if (counter < 0 || timeRemaining < 0) setNoMoreTime(true);
  }

  React.useEffect(() => {
    let interval = null;
    if (counter > 0) {
      interval = setInterval(() => {
        /* eslint-disable no-shadow */
        setCounter((counter) => counter - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <>
      {question.answers ? (
        <Container component="main" maxWidth="xs" className={classes.login}>
          <CssBaseline />
          <Typography style={{ fontWeight: 'bold' }}>
            {counter > 0 ? `Time Remaining: ${counter}` : ('')}
            {noMoreTime ? 'Time is Up' : (' ')}
          </Typography>
          <Card style={{ fontSize: '40px', padding: '10%' }}>
            <Typography style={{ fontSize: '70%', marginBottom: '4%' }}>
              {question.name}
              ?
            </Typography>
            {question.answers
              ? (
                Object.keys(question.answers).filter((key) => {
                  if (question.answers[key].length === 0) return false;
                  return true;
                }).map((key) => (
                  // eslint-disable-next-line no-param-reassign
                  <Button
                    name="option"
                    style={{
                      display: 'block', margin: '3%', border: '1px solid', backgroundColor: selectedAnswers[key] ? '#42c8f5' : '',
                    }}
                    onClick={() => setSelectedAnswers({
                      ...selectedAnswers,
                      [key]: (!selectedAnswers[key]),
                    })}
                  >
                    {key}
                    .
                    {question.answers[key]}
                  </Button>
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

          {/* <Dialog aria-labelledby="customized-dialog-title" open={noMoreTime}>
            <DialogTitle id="customized-dialog-title"> Correct Answers were: </DialogTitle>
            <Typography variant="body2" color="textSecondary" component="p" align="center">
              {question.correct ? (
                <Typography>
                  {question.correct[0]}
                </Typography>
              ) : (' ')}
            </Typography>
              </Dialog> */}
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
