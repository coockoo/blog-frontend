import React from 'react';
import { parseISO, format } from 'date-fns';

import s from './styles.less';

export default function Date(props) {
  return (
    <div className={s.date} title={props.value}>
      {format(parseISO(props.value), "eeee, do 'of' MMMM yyyy")}
    </div>
  );
}
