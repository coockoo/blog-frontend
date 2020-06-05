import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

import s from './styles.less';

export default function Link(props) {
  const { className, children, href, ...rest } = props;

  if (href) {
    return (
      <a href={href} className={cn(s.link, className)} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <RouterLink className={cn(s.link, className)} {...rest}>
      {children}
    </RouterLink>
  );
}
