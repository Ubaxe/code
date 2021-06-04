/* eslint-disable no-console */
import React from 'react';
import './App.css';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import Register from './Register';
import LogIn from './LogIn';
import Dashboard from './Dashboard';
import EditQuiz from './EditQuiz';
import Play from './Play';
import Results from './Results';
import EnteredGame from './EnteredGame';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/edit/:quizid" component={EditQuiz} />
          <Route exact path="/edit/:quizid/:id" component={EditQuiz} />
          <Route exact path="/play/:sessionID" component={Play} />
          <Route exact path="/results/:sessionID" component={Results} />
          <Route exact path="/entered/session=:sessionID/playerID=:playerID" component={EnteredGame} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
