import _ from 'lodash';

import graphQL from 'Services/graphql';
import unpublishArticleMutation from 'Services/graphql/mutations/unpublishArticle.gql';
import notifications from 'Services/notifications';

import { at } from '../reducer';

export default async function unpublishArticle(id, dispatch) {
  try {
    await graphQL(unpublishArticleMutation, { id });
  } catch (error) {
    const errorMessage = _.get(error, 'errors.0.message') || error.message;
    notifications.add(`Failed to unpublish article: ${errorMessage}`);
    return;
  }
  dispatch({ type: at.UNPUBLISH_ARTICLE_SUCCESS });
  notifications.add('Article unpublished!');
}
