import React from 'react';
import cn from 'classnames';

import Markdown from 'Components/Markdown';

import s from './styles.less';

export default function Body(props) {
  const { value, className, isLoading } = props;

  const content = isLoading ? null : <Markdown value={value} />;

  return <div className={cn(s.body, { [s.isLoading]: isLoading }, className)}>{content}</div>;
}
