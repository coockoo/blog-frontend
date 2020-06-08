import React from 'react';
import cn from 'classnames';

import s from './styles.less';

export default function Title(props) {
  const { children, className, isLoading, ...rest } = props;

  const content = isLoading ? null : children;

  return (
    <h1 className={cn(s.title, { [s.isLoading]: isLoading }, className)} {...rest}>
      {content}
    </h1>
  );
}
