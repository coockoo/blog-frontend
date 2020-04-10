import React, { useEffect, useReducer } from 'react';

import graphQL from '../../services/graphql';
import articlesQuery from '../../services/graphql/queries/articles.gql';

import { at, reducer, initialState } from './reducer';

import Article from './Article';

import s from './styles.less';

async function loadArticles(dispatch) {
  dispatch({ type: at.LOAD_ARTICLES_START });
  try {
    const res = await graphQL(articlesQuery);
    const { count, rows } = res.data.articles;
    dispatch({ type: at.LOAD_ARTICLES_SUCCESS, count, rows });
  } catch (error) {
    console.error(error);
    dispatch({ type: at.LOAD_ARTICLES_ERROR });
  }
}

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadArticles(dispatch);
  }, []);

  return (
    <div className={s.homePage}>
      {state.rows.map((article) => (
        <Article key={article.id} {...article} />
      ))}
    </div>
  );
}
