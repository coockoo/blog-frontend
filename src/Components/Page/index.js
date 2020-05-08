import React from 'react';
import cn from 'classnames';

import s from './styles.less';

export default function Page(props) {
  const { className, children, responsive, ...rest } = props;
  return (
    <div className={cn(s.page, { [s.responsive]: responsive }, className)} {...rest}>
      {children}
    </div>
  );
}

Page.defaultProps = {
  responsive: true,
};
