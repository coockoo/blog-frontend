import React from 'react';
import cn from 'classnames';

import s from './styles.less';

export default function Textarea(props) {
  const onChange = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <textarea
      value={props.value || ''}
      onChange={onChange}
      className={cn(props.className, s.textarea)}
    ></textarea>
  );
}

Textarea.defaultProps = {
  value: '',
  onChange: () => {},
};
