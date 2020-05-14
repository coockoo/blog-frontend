import React, { Fragment, useEffect, useReducer, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import articleQuery from 'Services/graphql/queries/article.gql';
import publishArticleMutation from 'Services/graphql/mutations/publishArticle.gql';
import unpublishArticleMutation from 'Services/graphql/mutations/unpublishArticle.gql';
import graphQL from 'Services/graphql';

import notifications from 'Services/notifications';

import Button from 'Components/Button';
import Date from 'Components/Date';
import Markdown from 'Components/Markdown';
import Page from 'Components/Page';

import useIsAuthenticated from 'Hooks/useIsAuthenticated';

import s from './styles.less';

import { reducer, initialState, at } from './reducer';

async function loadArticle(id, dispatch) {
  dispatch({ type: at.LOAD_START });
  let res;
  try {
    const isId = `${id}`.match(/^\d+$/);
    const args = isId ? { id } : { slug: id };
    res = await graphQL(articleQuery, args);
  } catch (error) {
    console.error(error);
    dispatch({ type: at.LOAD_ERROR });
    return;
  }
  dispatch({ type: at.LOAD_SUCCESS, article: res.article });
}

async function publishArticle(id, dispatch) {
  try {
    await graphQL(publishArticleMutation, { id });
  } catch (error) {
    console.error(error);
    return;
  }
  dispatch({ type: at.PUBLISH_ARTICLE_SUCCESS });
  notifications.add('Article published!');
}

async function unpublishArticle(id, dispatch) {
  try {
    await graphQL(unpublishArticleMutation, { id });
  } catch (error) {
    console.error(error);
    return;
  }
  dispatch({ type: at.UNPUBLISH_ARTICLE_SUCCESS });
  notifications.add('Article unpublished!');
}

export default function ArticlePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const { id } = useParams();
  const isAuthenticated = useIsAuthenticated();

  const { article } = state;

  useEffect(() => {
    loadArticle(id, dispatch);
  }, [id]);

  const isLoading = state.isLoading || !article;

  const edit = useCallback(() => {
    history.push(`/articles/${article.id}/edit`);
  }, [article, history]);

  const publish = useCallback(() => {
    publishArticle(article.id, dispatch);
  }, [article]);

  const unpublish = useCallback(() => {
    unpublishArticle(article.id, dispatch);
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
        <h1>{article.title}</h1>
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
