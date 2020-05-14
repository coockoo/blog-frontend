import React, { useCallback } from 'react';

import s from './styles.less';

export default function Notification(props) {
  const { id, onClick } = props;

  const handleClick = useCallback(
    (e) => {
      onClick(id, e);
    },
    [onClick, id]
  );

  return (
    <div className={s.notification} onClick={handleClick}>
      <p className={s.text}>{props.text}</p>
    </div>
  );
}

Notification.defaultProps = {
  onClick: () => {},
  text: 'Notification!',
};
