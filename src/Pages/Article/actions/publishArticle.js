import _ from 'lodash';

import graphQL from 'Services/graphql';
import publishArticleMutation from 'Services/graphql/mutations/publishArticle.gql';
import notifications from 'Services/notifications';

import { at } from '../reducer';

export default async function publishArticle(id, dispatch) {
  try {
    await graphQL(publishArticleMutation, { id });
  } catch (error) {
    const errorMessage = _.get(error, 'errors.0.message') || error.message;
    notifications.add(`Failed to publish article: ${errorMessage}`);
    return;
  }
  notifications.add('Article published!');
  dispatch({ type: at.PUBLISH_ARTICLE_SUCCESS });
}
