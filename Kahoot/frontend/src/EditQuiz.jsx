import React, { useState } from 'react';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Card, Button } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CheckIcon from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import standardAPIOptions from './standardAPIOptions';
import { Homeicon } from './Homeicon';
import API from './api';
import useStyles from './useStyles';

const api = new API('http://localhost:5005');
function EditQuiz() {
  const classes = useStyles();
  const [quizEditable, setQuizEditable] = useState({});
  const [questionAdded, setQuestionAdded] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [questionDeleted, setQuestionDeleted] = useState(false);
  const [questionType, setquestionType] = useState('');
  const [photouploaded, setphotouploaded] = useState(false);
  const [editClick, seteditClick] = useState(false);
  const [answerWarningMessage, setAnswerWarningMessage] = useState(false);
  const [singleChoiceWarning, setSingleChoiceWarning] = useState(false);
  const [editSubmit, seteditSubmit] = useState({
    submitted: false,
    successMessage: false,
  });
  const [selectedValue, setSelectedValue] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const loggedIn = localStorage.getItem('token');
  const quizObject = useParams();
  const history = useHistory();

  function clickEditQuestion(id) {
    seteditClick(!editClick);
    history.push(`/edit/${quizObject.quizid}/${id}`);
  }
  const handleClose = () => {
    setErrorDisplay(false);
  };

  React.useEffect(() => {
    const logged = localStorage.getItem('token');
    const options = standardAPIOptions('GET');
    options.headers.Authorization = `Bearer ${logged}`;
    api.makeAPIRequest(`admin/quiz/${quizObject.quizid}`, options)
      .then((r) => setQuizEditable(r));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionAdded, questionDeleted, editSubmit]);

  function addQuestion() {
    console.log(quizEditable.questions);
    const options = standardAPIOptions('PUT');
    options.headers.Authorization = `Bearer ${loggedIn}`;
    const originalQS = quizEditable.questions;
    options.body = JSON.stringify({
      questions: originalQS.concat([{
        id: Math.floor(Math.random() * 1000000),
      }]),
    });
    api.makeAPIRequest(`admin/quiz/${quizObject.quizid}`, options)
      .then(() => {
        setQuestionAdded(!questionAdded);
      });
  }

  function deleteQuestion(id) {
    const newQS = [];
    const options = standardAPIOptions('PUT');
    options.headers.Authorization = `Bearer ${loggedIn}`;
    const originalQS = quizEditable.questions;
    for (let i = 0; i < originalQS.length; i += 1) {
      if (id !== originalQS[i].id) {
        newQS.push(originalQS[i]);
      }
    }
    options.body = JSON.stringify({
      questions: newQS,
    });
    api.makeAPIRequest(`admin/quiz/${quizObject.quizid}`, options)
      .then(() => setQuestionDeleted(!questionDeleted));
    if (newQS.length === 0) {
      seteditClick(false);
    }
  }
  function editQuestion(event) {
    event.preventDefault();
    const logged = localStorage.getItem('token');
    const href = window.location.pathname;
    const id = parseInt(href.substring(href.lastIndexOf('/') + 1, href.length), 10);
    const originalQS = quizEditable.questions;
    const answers = {};
    const correct = [];
    let index = null;
    for (let i = 0; i < originalQS.length; i += 1) {
      if (id === originalQS[i].id) {
        originalQS[i].name = event.target.questionTitle.value;
        originalQS[i].point = parseInt(event.target.questionPoint.value, 10);
        originalQS[i].time = parseInt(event.target.questionTime.value, 10);
        originalQS[i].type = questionType;
        index = i;
      }
    }
    answers[1] = event.target.a1.value;
    answers[2] = event.target.a2.value;
    answers[3] = event.target.a3.value;
    answers[4] = event.target.a4.value;
    answers[5] = event.target.a5.value;
    answers[6] = event.target.a6.value;
    Object.entries(selectedValue).forEach(([k, v]) => {
      if (v === true) {
        correct.push(k);
      }
    });
    if (correct.length === 0) {
      setAnswerWarningMessage(true);
      return;
    }

    if (correct.length > 1 && questionType === 'single') {
      setSingleChoiceWarning(true);
      return;
    }
    originalQS[index].answers = answers;
    originalQS[index].correct = correct; // seperate correct answers from those that are not
    if (event.target.video.value && event.target.photo.files[0]) {
      // we cannot let the user submit both a video and photo
      setErrorDisplay(true);
      return;
    }
    originalQS[index].video = event.target.video.value; // add youtube video to backend
    // eslint-disable-next-line prefer-destructuring
    const options = standardAPIOptions('PUT');
    options.headers.Authorization = `Bearer ${logged}`;
    options.body = JSON.stringify({
      questions: originalQS,
    });
    if (event.target.photo.files[0]) {
      const FR = new FileReader();
      FR.readAsDataURL(event.target.photo.files[0]); // add photo to backend;
      FR.addEventListener('load', () => {
        originalQS[index].photo = FR.result;
        api.makeAPIRequest(`admin/quiz/${quizObject.quizid}`, options)
          .then(() => seteditSubmit({ submitted: true, successMessage: true }));
      });
    }
    api.makeAPIRequest(`admin/quiz/${quizObject.quizid}`, options)
      .then(() => seteditSubmit({ submitted: true, successMessage: true }));
  }
  const handleChange = (event) => {
    setquestionType(event.target.value);
  };
  const handleImageSelected = () => {
    setphotouploaded(true);
  };
  const handleSelectValue = (event) => {
    setSelectedValue({
      ...selectedValue,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <Grid container spacing={2}>
      <Container maxWidth="sm" className={classes.QuestionList}>
        <Homeicon />
        <CssBaseline />
        <Typography>
          Quiz Name:
          { quizEditable.name }
        </Typography>
        <AddIcon fontSize="large" onClick={() => addQuestion()} />
        {quizEditable.questions ? (
          quizEditable.questions && quizEditable.questions.map((question) => (
            <Card className={classes.QuestionCard}>
              <Button onClick={() => clickEditQuestion(question.id)}> Edit Question </Button>
              <Button onClick={() => deleteQuestion(question.id)}> DELETE Question </Button>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {question.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <Typography> There are no questions for this quiz</Typography>
        )}
      </Container>
      { editClick ? (
        <>
          <Container maxWidth="sm" className={classes.editQuestionSection}>
            <form onSubmit={(event) => editQuestion(event)}>
              <Grid item xs>
                <Grid item xs>
                  <TextField id="filled-size-small" placeholder="Question Title" name="questionTitle" required />
                </Grid>
                <Grid item xs container direction="column" justify="center" alignItems="center">
                  <TextField id="filled-size-small" placeholder="Time limit (secs)" name="questionTime" required />
                  <TextField id="filled-size-small" placeholder="Question Points" name="questionPoint" required />
                  <Grid item xs>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                      <Select
                        native
                        value={questionType}
                        onChange={handleChange}
                        name="questionType"
                        required
                      >
                        <option aria-label="None" />
                        <option value="multiple">multiple choice</option>
                        <option value="single">single choice</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid container spacing={2} className={classes.answerSection}>
                    <Grid item xs={8} sm={4} key="a1">
                      <TextField id="filled-size-small" placeholder="Add Compulsory Correct Answer" name="a1" required />
                      <Checkbox
                        checked={selectedValue[1]}
                        name="1"
                        onChange={handleSelectValue}
                        color="default"
                      />
                    </Grid>
                    <Grid item xs={8} sm={4} key="a2">
                      <TextField id="filled-size-small" placeholder="Add Answer" name="a2" required />
                      <Checkbox
                        checked={selectedValue[2]}
                        name="2"
                        onChange={handleSelectValue}
                        color="default"
                      />
                    </Grid>
                    <Grid item xs={8} sm={4} key="a3">
                      <TextField id="filled-size-small" placeholder="Add Answer" defaultValue="" name="a3" />
                      <Checkbox
                        checked={selectedValue[3]}
                        name="3"
                        onChange={handleSelectValue}
                        color="default"
                      />
                    </Grid>
                    <Grid item xs={8} sm={4} key="a4">
                      <TextField id="filled-size-small" placeholder="Add Answer" defaultValue="" name="a4" />
                      <Checkbox
                        checked={selectedValue[4]}
                        name="4"
                        onChange={handleSelectValue}
                        color="default"
                      />
                    </Grid>
                    <Grid item xs={8} sm={4} key="a5">
                      <TextField id="filled-size-small" placeholder="Add Answer" defaultValue="" name="a5" />
                      <Checkbox
                        checked={selectedValue[5]}
                        name="5"
                        onChange={handleSelectValue}
                        color="default"
                      />
                    </Grid>
                    <Grid item xs={8} sm={4} key="a6">
                      <TextField id="filled-size-small" placeholder="Add Answer" defaultValue="" name="a6" />
                      <Checkbox
                        checked={selectedValue[6]}
                        name="6"
                        onChange={handleSelectValue}
                        color="default"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Button
                    variant="contained"
                    component="label"
                  >
                    Upload Photo
                    <input
                      type="file"
                      name="photo"
                      hidden
                      onChange={() => handleImageSelected()}
                    />
                  </Button>
                  {photouploaded ? (
                    <Grid item xs style={{ display: 'inline-block', marginLeft: '3%' }}>
                      <CheckIcon />
                    </Grid>
                  ) : ('')}
                </Grid>
                <Grid item xs style={{ margin: '5%' }}>
                  <TextField id="filled-size-small" fullWidth="true" placeholder="Add link to YouTube video" name="video" />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="default" className={classes.submit}>
                Submit
              </Button>
              {editSubmit.submitted ? (
                <Grid item xs style={{ display: 'inline-block', marginLeft: '3%' }}>
                  <CheckIcon />
                </Grid>
              ) : ('')}
            </form>
            <Dialog aria-labelledby="customized-dialog-title" open={editSubmit.successMessage} onBackdropClick={() => seteditSubmit({ submitted: false, successMessage: false })}>
              <DialogTitle id="customized-dialog-title">Question successfully updated! </DialogTitle>
            </Dialog>
          </Container>
          <Snackbar open={errorDisplay} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Cannot include both supporting video and photo. Remove one.
            </Alert>
          </Snackbar>
          <Snackbar open={answerWarningMessage} onClose={() => setAnswerWarningMessage(false)}>
            <Alert onClose={() => setAnswerWarningMessage(false)} severity="error">
              You must add at least one answer as being correct
            </Alert>
          </Snackbar>
          <Snackbar open={singleChoiceWarning} onClose={() => setSingleChoiceWarning(false)}>
            <Alert onClose={() => setSingleChoiceWarning(false)} severity="error">
              You cannot have more than one correct answer for single-choice questions
            </Alert>
          </Snackbar>
        </>
      ) : '' }
    </Grid>
  );
}
export default EditQuiz;
