import React from 'react';
import { Button } from '@material-ui/core';
import {
  useHistory,
} from 'react-router-dom';
import useStyles from './useStyles';

function LogOut() {
  const classes = useStyles();
  const history = useHistory();

  function returnToHome() {
    // make api call to logout
    localStorage.clear();
    history.push('/');
  }

  return (
    <form onSubmit={returnToHome} style={{ margin: '2%' }}>
      <Button
        id="logout"
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        style={{ backgroundColor: '#4267B2' }}
      >
        Log Out
      </Button>
    </form>
  );
}
export default LogOut;
