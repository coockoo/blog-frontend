import React from 'react';
import cn from 'classnames';

import s from './styles.less';

export default function Textarea(props) {
  const { className, onChange, value, ...rest } = props;
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={cn(className, s.textarea)}
      {...rest}
    ></textarea>
  );
}

Textarea.defaultProps = {
  value: '',
  onChange: () => {},
};
