import React from 'react';

import s from './styles.less';

export default function Footer() {
  return (
    <div className={s.footer}>
      <ul>
        <li>
          <a href="https://github.com/coockoo" target="_blank" rel="noreferrer">
            github
          </a>
        </li>
        <li>
          <a href="https://twitter.com/BondarchukAlex_" target="_blank" rel="noreferrer">
            twitter
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/bondarchuk.alexandr" target="_blank" rel="noreferrer">
            facebook
          </a>
        </li>
      </ul>
    </div>
  );
}
