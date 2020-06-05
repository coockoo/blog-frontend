import React, { Fragment, useEffect, useReducer, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Button from 'Components/Button';
import Date from 'Components/Date';
import Markdown from 'Components/Markdown';
import Page from 'Components/Page';
import Title from 'Components/Title';

import useIsAuthenticated from 'Hooks/useIsAuthenticated';

import s from './styles.less';

import { reducer, initialState } from './reducer';

import actions from './actions';

export default function ArticlePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const { id } = useParams();
  const isAuthenticated = useIsAuthenticated();

  const { article } = state;

  useEffect(() => {
    actions.loadArticle(id, dispatch);
  }, [id]);

  const isLoading = state.isLoading || !article;

  const edit = useCallback(() => {
    history.push(`/articles/${article.id}/edit`);
  }, [article, history]);

  const publish = useCallback(() => {
    actions.publishArticle(article.id, dispatch);
  }, [article]);

  const unpublish = useCallback(() => {
    actions.unpublishArticle(article.id, dispatch);
  }, [article]);

  if (isLoading) {
    return (
      <Page>
        <div className={s.titlePlaceholder}></div>
        <div className={s.datePlaceholder}></div>

        <div className={s.bodyPlaceholderA}></div>
        <div className={s.bodyPlaceholderB}></div>
        <div className={s.bodyPlaceholderA}></div>
        <div className={s.bodyPlaceholderB}></div>
      </Page>
    );
  }

  return (
    <Page>
      <div className={s.title}>
        <Title>{article.title}</Title>
        {isAuthenticated ? (
          <Fragment>
            <Button onClick={edit}>Edit</Button>
            {!article.isPublished ? (
              <Button onClick={publish}>Publish</Button>
            ) : (
              <Button onClick={unpublish}>Unpublish</Button>
            )}
          </Fragment>
        ) : null}
      </div>
      <Date value={article.isPublished ? article.lastPublishedAt : article.createdAt} />
      <div className={s.articleBody}>
        <Markdown value={article.body} />
      </div>
    </Page>
  );
}
