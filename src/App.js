import React, { StrictMode } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TopNav from './components/TopNav';

import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';

function App() {
  return (
    <StrictMode>
      <Router>
        <TopNav />
        <Switch>
          <Route path="/private">
            <Route path="/private/sign-in">
              <SignInPage />
            </Route>
          </Route>
          <Route path="/">
            <Route path="/" exact>
              <HomePage />
            </Route>
          </Route>
        </Switch>
      </Router>
    </StrictMode>
  );
}

export default hot(App);
