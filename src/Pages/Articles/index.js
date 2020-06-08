import React, { useReducer, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Date from 'Components/Date';
import Link from 'Components/Link';
import Page from 'Components/Page';
import Title from 'Components/Title';

import useIsAuthenticated from 'Hooks/useIsAuthenticated';

import { reducer, initialState } from './reducer';

import actions from './actions';

import s from './styles.less';

export default function ArticlesPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    actions.loadArticles(dispatch);
  }, []);

  return (
    <Page>
      {state.rows.map((article) => (
        <div className={s.article} key={article.id}>
          <div className={s.title}>
            <Title>
              <RouterLink to={`/articles/${article.slug}`}>{article.title}</RouterLink>
              {!article.isPublished ? <span className={s.unpublished}>(Unpublished)</span> : null}
            </Title>
            {isAuthenticated ? <Link to={`/articles/${article.id}/edit`}>Edit</Link> : null}
          </div>
          <Date value={article.isPublished ? article.lastPublishedAt : article.createdAt} />
          <p className={s.outline}>{article.outline}</p>
        </div>
      ))}
    </Page>
  );
}
