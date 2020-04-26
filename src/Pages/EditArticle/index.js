import React, { useReducer, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import cn from 'classnames';

import Button from 'Components/Button';
import Textarea from 'Components/Textarea';

import s from './styles.less';

import { reducer, initialState, at } from './reducer';

async function doSaveArticle(id, state, dispatch) {
  dispatch({ type: at.SAVE_START });
  try {
    // TODO: add implementation
  } catch (error) {
    dispatch({ type: at.SAVE_ERROR });
    return;
  }
  dispatch({ type: at.SAVE_SUCCESS });
}

export default function EditArticlePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();

  const isNew = id === 'new';

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
          <Button onClick={saveArticle}>{isNew ? 'Create Article' : 'Update article'}</Button>
        </div>
      </form>
    </div>
  );
}
