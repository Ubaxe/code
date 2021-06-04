import * as React from 'react';
/* eslint-disable import/prefer-default-export */
import {
  useHistory,
} from 'react-router-dom';
import useStyles from './useStyles';

export const LogoutButton = () => {
  const classes = useStyles();
  const history = useHistory();

  function returnToHome() {
    // make api call to logout
    localStorage.clear();
    history.push('/');
  }
  return (
    <form onSubmit={returnToHome} style={{ margin: '2%' }}>
      <button
        id="logout"
        type="submit"
        className={classes.logOut}
        style={{ backgroundColor: '#4267B2', color: 'white' }}
      >
        Log Out
      </button>
    </form>
  );
};
