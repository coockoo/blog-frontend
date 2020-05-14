import React, { useReducer, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import cn from 'classnames';

import Button from 'Components/Button';
import Markdown from 'Components/Markdown';
import Page from 'Components/Page';
import Textarea from 'Components/Textarea';

import articleQuery from 'Services/graphql/queries/article.gql';
import createArticleMutation from 'Services/graphql/mutations/createArticle.gql';
import updateArticleMutation from 'Services/graphql/mutations/updateArticle.gql';
import graphQL from 'Services/graphql';

import notifications from 'Services/notifications';

import s from './styles.less';

import { reducer, initialState, at } from './reducer';

const isNew = (id) => id === 'new';

async function doSaveArticle(id, state, dispatch, history) {
  dispatch({ type: at.SAVE_START });
  let res;
  const isArticleNew = isNew(id);
  try {
    const mutation = isArticleNew ? createArticleMutation : updateArticleMutation;
    const variables = {
      title: state.title,
      outline: state.outline,
      body: state.body,
    };
    if (!isArticleNew) {
      variables.id = id;
    }
    res = await graphQL(mutation, variables);
  } catch (error) {
    dispatch({ type: at.SAVE_ERROR });
    return;
  }
  dispatch({ type: at.SAVE_SUCCESS });

  if (isArticleNew) {
    history.replace(`/articles/${res.createArticle.id}/edit`);
  }
  notifications.add('Article saved!');
}

async function doLoadArticle(id, dispatch) {
  const isArticleNew = isNew(id);
  if (isArticleNew) {
    dispatch({ type: at.RESET });
    return;
  }

  dispatch({ type: at.LOAD_START });
  let res;
  try {
    res = await graphQL(articleQuery, { id });
  } catch (error) {
    dispatch({ type: at.LOAD_ERROR });
    return;
  }
  dispatch({ type: at.LOAD_SUCCESS, article: res.article });
}

export default function EditArticlePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();
  const history = useHistory();

  const saveArticle = useCallback(() => {
    doSaveArticle(id, state, dispatch, history);
  }, [id, state, history]);

  useEffect(() => {
    doLoadArticle(id, dispatch);
  }, [id]);

  return (
    <Page responsive={false}>
      <form className={s.articleForm}>
        <div className={s.formGroup}>
          <input
            className={s.articleTitle}
            type="text"
            placeholder="Title..."
            value={state.title}
            onChange={(e) => dispatch({ type: at.CHANGE, update: { title: e.target.value } })}
          />
        </div>

        <div className={s.formGroup}>
          <input
            type="text"
            value={state.outline}
            placeholder="Outline"
            onChange={(e) => dispatch({ type: at.CHANGE, update: { outline: e.target.value } })}
          />
        </div>
        <div className={cn(s.formGroup, s.bodyGroup)}>
          <div className={s.articleBody}>
            <div className={s.bodyEditor}>
              <Textarea
                value={state.body}
                onChange={(body) => dispatch({ type: at.CHANGE, update: { body } })}
                className={s.bodyText}
                placeholder="Let your thoughts fly"
              />
            </div>
            <div className={s.bodyPreview}>
              <Markdown value={state.body} />
            </div>
          </div>
        </div>
        <div>
          <Button onClick={saveArticle}>{isNew(id) ? 'Create Article' : 'Update article'}</Button>
        </div>
      </form>
    </Page>
  );
}
