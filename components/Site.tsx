import xs from 'xstream';
import { html } from 'snabbdom-jsx';

import styles from './Site.css';

function Site() {
  return {
    DOM: xs.of(
      <div className={styles.root}>
        <h1>Welcome to my stuff</h1>
        <p>In the future there will be a blog and stuff</p>
        <p>For now ... just chill</p>
      </div>,
    ),
  };
}

export default Site;
