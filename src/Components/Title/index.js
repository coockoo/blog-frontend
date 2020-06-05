import React from 'react';
import cn from 'classnames';

import s from './styles.less';

export default function Title(props) {
  const { children, className, ...rest } = props;
  return (
    <h1 className={cn(s.title, className)} {...rest}>
      {children}
    </h1>
  );
}
