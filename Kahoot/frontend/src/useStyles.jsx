import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    height: '50px',
  },
  logOut: {
    margin: theme.spacing(1, 0, 2),
    height: '50px',
    width: '100px',
    borderRadius: '5px',
    fontSize: '1em',
  },
  link: {
    fontSize: '1em',
  },
  login: {
    height: '500px',
    width: '400px',
    paddingTop: '30px',
  },
  QuestionList: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  QuestionCard: {
    height: 'fit-content',
    width: '290px',
  },
  editQuestionSection: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  answerSection: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  },
  submitAnswerButton: {
    marginTop: theme.spacing(10),
  },
}));

export default useStyles;
