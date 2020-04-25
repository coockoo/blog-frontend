import React, { StrictMode } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TopNav from 'Components/TopNav';

import HomePage from 'Pages/Home';
import SignInPage from 'Pages/SignIn';

function App() {
  return (
    <StrictMode>
      <Router>
        <TopNav />
        <Route path="/sign-in" exact>
          <SignInPage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Router>
    </StrictMode>
  );
}

export default hot(App);
