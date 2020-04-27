import React from 'react';
import { Link } from 'react-router-dom';

import s from './styles.less';

export default function Article(props) {
  const dateStr = new Date(+props.createdAt).toISOString();

  return (
    <div className={s.article}>
      <h1>
        <Link to={`/articles/${props.id}`}>{props.title}</Link>
      </h1>
      <p>{props.outline}</p>
      <div className={s.date} title={dateStr}>
        {dateStr}
      </div>
    </div>
  );
}
