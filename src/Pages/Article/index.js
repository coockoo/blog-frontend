import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import articleQuery from 'Services/graphql/queries/article.gql';
import graphQL from 'Services/graphql';

import Markdown from 'Components/Markdown';

import s from './styles.less';

import { reducer, initialState, at } from './reducer';

async function loadArticle(id, dispatch) {
  dispatch({ type: at.LOAD_START });
  let res;
  try {
    res = await graphQL(articleQuery, { id });
  } catch (error) {
    console.error(error);
    dispatch({ type: at.LOAD_ERROR });
    return;
  }
  dispatch({ type: at.LOAD_SUCCESS, article: res.article });
}

export default function ArticlePage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { id } = useParams();

  useEffect(() => {
    loadArticle(id, dispatch);
  }, [id]);

  if (state.isLoading || !state.article) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.articlePage}>
      <h1>{state.article.title}</h1>
      <div className={s.articleBody}>
        <Markdown value={state.article.body} />
      </div>
    </div>
  );
}
