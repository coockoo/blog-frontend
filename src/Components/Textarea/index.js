import React from 'react';
import cn from 'classnames';

import s from './styles.less';

export default function Textarea(props) {
  const { className, onChange, value, ...rest } = props;
  const rows = value.split(/\n/).length;
  const minRows = 10;

  return (
    <textarea
      rows={Math.max(rows, minRows)}
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
