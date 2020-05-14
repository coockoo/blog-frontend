import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import useIsAuthenticated from 'Hooks/useIsAuthenticated';

import Button from 'Components/Button';
import Date from 'Components/Date';

import s from './styles.less';

export default function Article(props) {
  const { id, slug, title, isPublished, outline, lastPublishedAt, createdAt } = props;
  const isAuthenticated = useIsAuthenticated();
  const history = useHistory();

  const edit = useCallback(() => {
    history.push(`/articles/${id}/edit`);
  }, [id, history]);

  return (
    <div className={s.article}>
      <div className={s.title}>
        <h1>
          <Link to={`/articles/${slug}`}>{title}</Link>
          {!isPublished ? <span className={s.unpublished}>(Unpublished)</span> : null}
        </h1>
        {isAuthenticated ? <Button onClick={edit}>Edit</Button> : null}
      </div>
      <Date value={isPublished ? lastPublishedAt : createdAt} />
      <p className={s.outline}>{outline}</p>
    </div>
  );
}
