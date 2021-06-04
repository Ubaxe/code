/* eslint-disable no-console */
import React from 'react';
import { useParams } from 'react-router';
import './App.css';

function Results() {
  const session = useParams();
  return (
    <>
      <p>
        results for session
        {console.log(session)}
        {session.sessionID}
      </p>
    </>
  );
}
export default Results;
