import _ from 'lodash';

import graphQL from 'Services/graphql';
import articleQuery from 'Services/graphql/queries/article.gql';
import notifications from 'Services/notifications';

import { at } from '../reducer';

export default async function loadArticle(id, dispatch) {
  dispatch({ type: at.LOAD_START });
  let article = null;
  try {
    const isId = `${id}`.match(/^\d+$/);
    const args = isId ? { id } : { slug: id };
    const res = await graphQL(articleQuery, args);
    article = res.article;
  } catch (error) {
    const errorMessage = _.get(error, 'errors.0.message') || error.message;
    notifications.add(`Failed to load article: ${errorMessage}`);
    dispatch({ type: at.LOAD_ERROR });
    return;
  }
  dispatch({ type: at.LOAD_SUCCESS, article });
}
