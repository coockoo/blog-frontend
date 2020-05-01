import React from 'react';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

import s from './styles.less';

export default function Article(props) {
  return (
    <div className={s.article}>
      <h1>
        <Link to={`/articles/${props.id}`}>{props.title}</Link>
      </h1>
      <div className={s.date} title={props.createdAt}>
        {format(parseISO(props.createdAt), "eeee, do 'of' MMMM yyyy")}
      </div>
      <p className={s.outline}>{props.outline}</p>
    </div>
  );
}
