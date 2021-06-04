import * as React from 'react';
/* eslint-disable import/prefer-default-export */
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';

export const Homeicon = () => {
  const history = useHistory();
  return (
    <HomeIcon onClick={() => history.push('/dashboard')} />
  );
};
