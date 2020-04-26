import React, { useReducer, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import cn from 'classnames';

import Button from 'Components/Button';
import Textarea from 'Components/Textarea';

import createArticleMutation from 'Services/graphql/mutations/createArticle.gql';
import updateArticleMutation from 'Services/graphql/mutations/updateArticle.gql';
import graphQL from 'Services/graphql';

import s from './styles.less';

import { reducer, initialState, at } from './reducer';

const isNew = (id) => id === 'new';

async function doSaveArticle(id, state, dispatch) {
  dispatch({ type: at.SAVE_START });
  let res;
  try {
    const isArticleNew = isNew(id);
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
  console.log(res);
}

export default function EditArticlePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();

  const saveArticle = useCallback(() => {
    doSaveArticle(id, state, dispatch);
  }, [id, state]);

  return (
    <div className={s.editArticlePage}>
      <form className={s.articleForm}>
        <div className={s.formGroup}>
          <label>Title</label>
          <input
            type="text"
            value={state.title}
            onChange={(e) => dispatch({ type: at.CHANGE, update: { title: e.target.value } })}
          />
        </div>
        <div className={s.formGroup}>
          <label>Outline</label>
          <input
            type="text"
            value={state.outline}
            onChange={(e) => dispatch({ type: at.CHANGE, update: { outline: e.target.value } })}
          />
        </div>
        <div className={cn(s.formGroup, s.bodyGroup)}>
          <label>Body</label>
          <div className={s.articleBody}>
            <div>
              <Textarea
                value={state.body}
                onChange={(body) => dispatch({ type: at.CHANGE, update: { body } })}
                className={s.bodyText}
              />
            </div>
            <div>
              <ReactMarkdown source={state.body} />
            </div>
          </div>
        </div>
        <div>
          <Button onClick={saveArticle}>{isNew(id) ? 'Create Article' : 'Update article'}</Button>
        </div>
      </form>
    </div>
  );
}
