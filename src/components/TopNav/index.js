import React from 'react';
import { Link } from 'react-router-dom';

import s from './styles.less';

export default function TopNav() {
  return (
    <div className={s.topNav}>
      <div className={s.brand}>
        <Link to="/">Oleksandr&apos;s Blog</Link>
      </div>
    </div>
  );
}
