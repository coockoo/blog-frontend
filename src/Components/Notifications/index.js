import React, { useState, useEffect } from 'react';

import notifications from 'Services/notifications';

import Notification from './Notification';
import s from './styles.less';

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    function subscription() {
      setItems(notifications.getAll());
    }

    notifications.subscribe(subscription);
    return () => {
      notifications.unsubscribe(subscription);
    };
  }, []);

  return (
    <div className={s.notifications}>
      {items.map((item) => (
        <Notification
          key={item.id}
          text={item.text}
          onClick={() => notifications.remove(item.id)}
        />
      ))}
    </div>
  );
}
