import { Stream } from 'xstream';
import { createElement } from 'snabbdom-pragma';

import styles from './Footer.css';

export default function Footer(config$: Stream<any>) {
  return {
    DOM: config$.map(config => (
      <footer className={styles.root}>
        <p>
          <a
            className={styles.link}
            target="_blank"
            href="https://github.com/Sinewyk/sinewyk-stuff"
          >
            Source code
          </a>
        </p>
        <p>
          Latest release:{' '}
          {new Date(config.last_build_time).toLocaleDateString()}
        </p>
      </footer>
    )),
  };
}
