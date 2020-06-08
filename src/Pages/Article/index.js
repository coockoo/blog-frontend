import React, { Fragment, useEffect, useReducer, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Body from 'Components/Body';
import Button from 'Components/Button';
import Date from 'Components/Date';
import Link from 'Components/Link';
import Page from 'Components/Page';
import Title from 'Components/Title';

import useIsAuthenticated from 'Hooks/useIsAuthenticated';

import s from './styles.less';

import { reducer, initialState } from './reducer';

import actions from './actions';

export default function ArticlePage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { id } = useParams();
  const isAuthenticated = useIsAuthenticated();

  const { article } = state;

  useEffect(() => {
    actions.loadArticle(id, dispatch);
  }, [id]);

  const isLoading = state.isLoading || !article.id;

  const publish = useCallback(() => {
    actions.publishArticle(article.id, dispatch);
  }, [article]);

  const unpublish = useCallback(() => {
    actions.unpublishArticle(article.id, dispatch);
  }, [article]);

  return (
    <Page>
      <div className={s.title}>
        <Title isLoading={isLoading}>{article.title}</Title>
        {isAuthenticated && !isLoading ? (
          <Fragment>
            <Link to={`/articles/${article.id}/edit`}>Edit</Link>
            {!article.isPublished ? (
              <Button onClick={publish}>Publish</Button>
            ) : (
              <Button onClick={unpublish}>Unpublish</Button>
            )}
          </Fragment>
        ) : null}
      </div>
      <Date
        value={article.isPublished ? article.lastPublishedAt : article.createdAt}
        isLoading={isLoading}
      />
      <Body isLoading={isLoading} value={article.body} />
    </Page>
  );
}
