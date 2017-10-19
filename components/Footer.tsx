import { just } from 'most';
import { html } from 'snabbdom-jsx';

import styles from './Footer.css';

export default function Footer() {
  return {
    DOM: just(
      <footer className={styles.root}>
        Latest release: {new Date(__LAST_BUILD_TIME__).toLocaleDateString()}
      </footer>,
    ),
  };
}
