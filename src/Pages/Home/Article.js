import React from 'react';
import { Link } from 'react-router-dom';

import Date from 'Components/Date';

import s from './styles.less';

export default function Article(props) {
  return (
    <div className={s.article}>
      <h1>
        <Link to={`/articles/${props.id}`}>{props.title}</Link>
      </h1>
      <Date value={props.createdAt} />
      <p className={s.outline}>{props.outline}</p>
    </div>
  );
}
