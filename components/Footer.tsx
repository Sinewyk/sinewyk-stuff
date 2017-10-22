import { Stream } from 'xstream';
import { html } from 'snabbdom-jsx';

import styles from './Footer.css';

export default function Footer(config$: Stream<any>) {
  return {
    DOM: config$.map(config => (
      <footer className={styles.root}>
        Latest release: {new Date(config.last_build_time).toLocaleDateString()}
      </footer>
    )),
  };
}
