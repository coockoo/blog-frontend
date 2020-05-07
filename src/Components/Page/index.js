import React from 'react';
import cn from 'classnames';

import s from './styles.less';

export default function Page(props) {
  const { className, children, ...rest } = props;
  return (
    <div className={cn(className, s.page)} {...rest}>
      {children}
    </div>
  );
}
