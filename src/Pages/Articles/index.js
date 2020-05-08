import React, { useReducer, useEffect } from 'react';

import Page from 'Components/Page';

import articlesQuery from 'Services/graphql/queries/articles.gql';
import graphQL from 'Services/graphql';

import { reducer, initialState, at } from './reducer';

import Article from './Article';

async function loadArticles(dispatch) {
  dispatch({ type: at.LOAD_ARTICLES_START });
  try {
    const res = await graphQL(articlesQuery);
    const { count, rows } = res.articles;
    dispatch({ type: at.LOAD_ARTICLES_SUCCESS, count, rows });
  } catch (error) {
    console.error(error);
    dispatch({ type: at.LOAD_ARTICLES_ERROR });
  }
}

export default function ArticlesPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadArticles(dispatch);
  }, []);

  return (
    <Page>
      {state.rows.map((article) => (
        <Article key={article.id} {...article} />
      ))}
    </Page>
  );
}
