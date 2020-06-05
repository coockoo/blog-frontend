import React from 'react';

import Link from 'Components/Link';

import s from './styles.less';

export default function Footer() {
  return (
    <div className={s.footer}>
      <ul>
        <li>
          <Link href="https://github.com/coockoo">github</Link>
        </li>
        <li>
          <Link href="https://twitter.com/BondarchukAlex_">twitter</Link>
        </li>
        <li>
          <Link href="https://www.facebook.com/bondarchuk.alexandr">facebook</Link>
        </li>
      </ul>
    </div>
  );
}
