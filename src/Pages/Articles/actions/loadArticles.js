import _ from 'lodash';

import graphQL from 'Services/graphql';
import articlesQuery from 'Services/graphql/queries/articles.gql';
import notifications from 'Services/notifications';

import { at } from '../reducer';

export default async function loadArticles(dispatch) {
  dispatch({ type: at.LOAD_ARTICLES_START });
  let count = 0;
  let rows = [];
  try {
    const res = await graphQL(articlesQuery);
    count = res.articles.count;
    rows = res.articles.rows;
  } catch (error) {
    const errorMessage = _.get(error, 'errors.0.message') || error.message;
    notifications.add(`Failed to load article: ${errorMessage}`);
    dispatch({ type: at.LOAD_ARTICLES_ERROR });
    return;
  }
  dispatch({ type: at.LOAD_ARTICLES_SUCCESS, count, rows });
}
