import React, { StrictMode } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Notifications from 'Components/Notifications';
import PrivateRoute from 'Components/PrivateRoute';
import TopNav from 'Components/TopNav';

import ArticlePage from 'Pages/Article';
import ArticlesPage from 'Pages/Articles';
import EditArticlePage from 'Pages/EditArticle';
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
        <Route path="/articles/:id" exact>
          <ArticlePage />
        </Route>
        <PrivateRoute path="/articles/:id/edit" exact>
          <EditArticlePage />
        </PrivateRoute>
        <PrivateRoute path="/articles" exact>
          <ArticlesPage />
        </PrivateRoute>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Router>
      <Notifications />
    </StrictMode>
  );
}

export default hot(App);
