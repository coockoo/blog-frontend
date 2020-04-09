import React, { StrictMode } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TopNav from './components/TopNav';

import HomePage from './pages/Home';

function App() {
  return (
    <StrictMode>
      <Router>
        <TopNav />
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Router>
    </StrictMode>
  );
}

export default hot(App);
