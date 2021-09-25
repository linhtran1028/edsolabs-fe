import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/layout/Login';
import HomePage from './components/layout/Page';
import List from './components/layout/List';

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
