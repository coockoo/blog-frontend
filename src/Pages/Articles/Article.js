import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import useIsAuthenticated from 'Hooks/useIsAuthenticated';

import Button from 'Components/Button';
import Date from 'Components/Date';

import s from './styles.less';

export default function Article(props) {
  const isAuthenticated = useIsAuthenticated();
  const history = useHistory();

  const edit = useCallback(() => {
    history.push(`/articles/${props.id}/edit`);
  }, [props.id, history]);

  return (
    <div className={s.article}>
      <div className={s.title}>
        <h1>
          <Link to={`/articles/${props.id}`}>{props.title}</Link>
          {!props.isPublished ? <span className={s.unpublished}>(Unpublished)</span> : null}
        </h1>
        {isAuthenticated ? <Button onClick={edit}>Edit</Button> : null}
      </div>
      <Date value={props.createdAt} />
      <p className={s.outline}>{props.outline}</p>
    </div>
  );
}
