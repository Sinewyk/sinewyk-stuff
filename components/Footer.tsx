import { Stream } from 'xstream';
import { createElement } from 'snabbdom-pragma';

import styles from './Footer.css';

export default function Footer(config$: Stream<any>) {
  return {
    DOM: config$.map(config => (
      <footer className={styles.root}>
        <div className={styles.inner}>
          <p>
            <a
              className={styles.link}
              target="_blank"
              href="https://github.com/Sinewyk/sinewyk-stuff"
            >
              Source code
            </a>
          </p>
          <p title={config.last_build_time}>
            Latest release: {new Date(config.last_build_time).toUTCString()}
          </p>
        </div>
      </footer>
    )),
  };
}
