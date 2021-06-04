/* eslint-disable max-len */
import React, { useState } from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Redirect, useHistory,
} from 'react-router-dom';
import { Card, Button } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { LogoutButton } from './LogoutButton';
import useStyles from './useStyles';
import API from './api';
import standardAPIOptions from './standardAPIOptions';

const api = new API('http://localhost:5005');

function Dashboard() {
  const loggedIn = localStorage.getItem('token');
  const classes = useStyles(); // if we are logged in, show dashboard
  const [quizzes, setQuizzes] = useState([]);
  const [quizDeleted, setQuizDeleted] = useState('false');
  const [quizAdded, setQuizAdded] = useState('false');
  const [hover, sethover] = useState(false);

  const [overallStatus, setOverallStatus] = useState({
    popUp: false,
    sessionID: 10,
    gameStatus: null,
    resultsPopUp: false,
    advanceGame: false,
  });
  /*
  const [popup, setPopup] = useState(false);
  const [sessionID, setsessionID] = useState();
  const [gameStatus, setGameStatus] = useState(false);
  */
  const history = useHistory();
  function editGame(quizID) {
    history.push(`/edit/${quizID}`);
  }

  function viewResults(session) {
    history.push(`/results/${session}`);
  }

  React.useEffect(() => {
    const ID = [];
    const requests = [];
    const options = standardAPIOptions('GET');
    const logged = localStorage.getItem('token');
    options.headers.Authorization = `Bearer ${logged}`;
    console.log(overallStatus.sessionID);
    api.makeAPIRequest('admin/quiz', options)
      .then((r) => r.quizzes)
      .then((quizList) => {
        quizList.map((quiz) => requests.push(api.makeAPIRequest(`admin/quiz/${quiz.id}`, options)));
        quizList.map((quiz) => ID.push(quiz.id));
      })
      .then(() => {
        Promise.all(requests)
          .then((completeQuizList) => {
            const copy = JSON.parse(JSON.stringify(completeQuizList));
            for (let i = 0; i < copy.length; i += 1) {
              copy[i].id = ID[i];
            }
            setQuizzes(copy);
          });
      });
  }, [quizDeleted, overallStatus]);

  // if (!loggedIn) return (<Redirect to="/" />); // re-direct user to login page if they try to access dash without auth
  function addGame(event, name) {
    const options = standardAPIOptions('POST');
    options.headers.Authorization = `Bearer ${loggedIn}`;
    options.body = JSON.stringify({
      name,
    });
    api.makeAPIRequest('admin/quiz/new', options);
    setQuizAdded(!quizAdded);
  }

  function deleteGame(quizID) {
    const options = standardAPIOptions('DELETE');
    options.headers.Authorization = `Bearer ${loggedIn}`;
    api.makeAPIRequest(`admin/quiz/${quizID}`, options);
    setQuizDeleted(!quizDeleted);
  }

  function startGame(quiz) {
    let options = standardAPIOptions('POST');
    options.headers.Authorization = `Bearer ${loggedIn}`;
    api.makeAPIRequest(`admin/quiz/${quiz.id}/start`, options).then((r) => {
      if (r.error === undefined) { // no error present
        /* (setGameStatus(true);
        handlePopup(quiz.active); */
        console.log(r);
        options = standardAPIOptions('GET');
        options.headers.Authorization = `Bearer ${loggedIn}`;
        api.makeAPIRequest(`admin/quiz/${quiz.id}`, options)
          .then((updatedQuiz) => {
            localStorage.setItem('sessionID', updatedQuiz.active);
            setOverallStatus({
              ...overallStatus,
              gameStatus: true,
              sessionID: updatedQuiz.active,
              popUp: true,
            });
          });
      }
    });
  }

  function endGame(quiz) {
    const options = standardAPIOptions('POST');
    options.headers.Authorization = `Bearer ${loggedIn}`;
    api.makeAPIRequest(`admin/quiz/${quiz.id}/end`, options).then((r) => {
      if (r.error === undefined) {
        setOverallStatus({
          ...overallStatus,
          gameStatus: false,
          resultsPopUp: true,
        });
      }
    });
  }

  function advanceGame(quiz) {
    const options = standardAPIOptions('POST');
    const logged = localStorage.getItem('token');
    options.headers.Authorization = `Bearer ${logged}`;

    api.makeAPIRequest(`admin/quiz/${quiz.id}/advance`, options)
      .then((r) => {
        if (r.error === undefined) { setOverallStatus({ ...overallStatus, advanceGame: true }); }
      });
  }

  const copySession = (session) => {
    navigator.clipboard.writeText(`http://localhost:3000/play/${session}`);
  };

  // if (!loggedIn) return (<Redirect to="/" />); // re-direct user to login page if they try to access dash without auth
  return (
    <>
      {!loggedIn
        ? (<Redirect to="/" />) : (
          <>
            <LogoutButton />
            <Container component="main" maxWidth="xs" className={classes.paper}>
              <CssBaseline />
              <form onSubmit={(event) => addGame(event, event.target.gameName.value)}>
                <input type="text" name="gameName" placeholder="Enter name of game" />
                <input type="submit" />
              </form>
              {quizzes.map((quiz) => (
                <Card key={quiz.id} style={{ margin: '4%' }}>
                  <Button onClick={() => editGame(quiz.id)}> Edit Game</Button>
                  <Button onClick={() => deleteGame(quiz.id)}> DELETE GAME</Button>
                  <Grid container align="center" justify="center" alignItems="center">
                    <Button
                      component="label"
                    >
                      Upload CSV
                      <input
                        type="file"
                        style={{ display: 'none' }}
                      />
                    </Button>
                    <Grid item xs={12} sm={6}>
                      {quiz.active ? (
                        <>
                          <StopIcon style={{ fill: 'red' }} onClick={() => endGame(quiz)} />
                          <NavigateNextIcon
                            onClick={() => advanceGame(quiz)}
                            onMouseOver={() => sethover(true)}
                            onMouseOut={() => sethover(false)}
                          />
                          {hover ? (<p style={{ fontSize: '10px' }}>Advance Game Button </p>) : ('')}
                        </>
                      )
                        : <PlayArrowIcon style={{ fill: 'green' }} onClick={() => startGame(quiz)} />}
                    </Grid>
                  </Grid>
                  <CardActionArea>
                    <img alt="quiz thumbnail" src={quiz.thumbnail} />
                    {/* {quiz.active ? <Button onClick={() => handlePopup(quiz.active)}>Game Code</Button> : ('')} */}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {quiz.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Number of questions:
                        {quiz.questions.length}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Total time to complete:
                        {quiz.questions && quiz.questions.reduce((a, c) => a + c.time, 0)}
                        {
                    console.log(quiz.questions)
                    // quiz.questions.reduce((previous, current) => previous + current.time, 0)
                  }
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
              <Dialog onBackdropClick={() => setOverallStatus({ ...overallStatus, popUp: false })} aria-labelledby="customized-dialog-title" open={overallStatus.popUp}>
                <DialogTitle id="customized-dialog-title" onBackdropClick={() => setOverallStatus({ ...overallStatus, popUp: false })}>Game Session Id: </DialogTitle>
                <Typography variant="body2" color="textSecondary" component="p" align="center">
                  <Button onClick={() => copySession(overallStatus.sessionID)}>
                    {overallStatus.sessionID}
                  </Button>
                  <Button onClick={() => copySession(overallStatus.sessionID)} style={{ backgroundColor: '#3f51b5', margin: '5%', color: 'white' }}>
                    Copy Session URL
                  </Button>
                </Typography>
              </Dialog>

              <Dialog onBackdropClick={() => setOverallStatus({ ...overallStatus, resultsPopUp: false })} aria-labelledby="customized-dialog-title" open={overallStatus.resultsPopUp}>
                <DialogTitle id="customized-dialog-title" onBackdropClick={() => setOverallStatus({ ...overallStatus, resultsPopUp: false })}>Would you like to view the results? </DialogTitle>
                <Typography variant="body2" color="textSecondary" component="p" align="center">
                  <Button onClick={() => viewResults(overallStatus.sessionID)} style={{ backgroundColor: '#90ee90', margin: '5%', fontWeight: 'bold' }}>
                    Yes
                  </Button>
                  <Button onClick={() => setOverallStatus({ ...overallStatus, resultsPopUp: false })} style={{ backgroundColor: '#FD3F52', margin: '5%', fontWeight: 'bold' }}>
                    No
                  </Button>
                </Typography>
              </Dialog>

              <Dialog onBackdropClick={() => setOverallStatus({ ...overallStatus, advanceGame: false })} aria-labelledby="customized-dialog-title" open={overallStatus.advanceGame}>
                <DialogTitle id="customized-dialog-title" onBackdropClick={() => setOverallStatus({ ...overallStatus, advanceGame: false })}>Game advanced by one question! </DialogTitle>
              </Dialog>
            </Container>
          </>

        )}
    </>
  );
}
export default Dashboard;
