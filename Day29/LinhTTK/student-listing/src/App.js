import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Layout/Login';
import HomePage from './Components/Layout/Page';
import List from './Components/Layout/List';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/List">
            <List />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
