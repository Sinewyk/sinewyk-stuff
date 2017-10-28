import xs from 'xstream';
import { createElement } from 'snabbdom-pragma';

import styles from './Header.css';

export default function Header() {
  return {
    DOM: xs.of(
      <div>
        <header className={styles.header}>Sinewyk's Stuff</header>
        <div className={styles.sub}>
          <p>Welcome to my stuff</p>
          <p>In the future there will be a blog and stuff</p>
          <p>For now ... just chill</p>
        </div>
      </div>,
    ),
  };
}
