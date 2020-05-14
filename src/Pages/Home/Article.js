import React from 'react';
import { Link } from 'react-router-dom';

import Date from 'Components/Date';

import s from './styles.less';

export default function Article(props) {
  const { slug, title, isPublished, lastPublishedAt, createdAt, outline } = props;

  return (
    <div className={s.article}>
      <h1>
        <Link to={`/articles/${slug}`}>{title}</Link>
      </h1>
      <Date value={isPublished ? lastPublishedAt : createdAt} />
      <p className={s.outline}>{outline}</p>
    </div>
  );
}
