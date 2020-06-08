import React, { useEffect, useReducer } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Date from 'Components/Date';
import Page from 'Components/Page';
import Title from 'Components/Title';

import { reducer, initialState } from './reducer';

import actions from './actions';

import s from './styles.less';

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    actions.loadArticles(dispatch);
  }, []);

  return (
    <Page>
      {state.rows.map((article) => (
        <div key={article.id} className={s.article}>
          <Title>
            <RouterLink to={`/articles/${article.slug}`}>{article.title}</RouterLink>
          </Title>
          <Date value={article.isPublished ? article.lastPublishedAt : article.createdAt} />
          <p className={s.outline}>{article.outline}</p>
        </div>
      ))}
    </Page>
  );
}
