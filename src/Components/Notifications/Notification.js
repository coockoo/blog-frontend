import React from 'react';

import s from './styles.less';

export default function Notification(props) {
  return (
    <div className={s.notification} onClick={props.onClick}>
      <p className={s.text}>{props.text}</p>
    </div>
  );
}

Notification.defaultProps = {
  onClick: () => {},
  text: 'Notification!',
};
