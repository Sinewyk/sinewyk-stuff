import xs from 'xstream';
import { createElement } from 'snabbdom-pragma';
import { Sources } from '../src/interfaces';
import { Container } from './Container';
import { Date_ } from './Date';

import styles from './Footer.css';

export default function Footer(sources: Sources) {
  return {
    DOM: xs
      .combine(sources.History, sources.Config)
      .map(([{ pathname }, config]) => (
        <footer className={styles.root}>
          <Container>
            {pathname !== '/' ? (
              <p>
                <a target="" className={styles.link} href="/">
                  Home
                </a>
              </p>
            ) : null}
            <p>
              <a
                className={styles.link}
                target="_blank"
                href={config.git_repository}
              >
                Source code
              </a>
            </p>
            <p title={config.last_build_time}>
              Latest release: <Date_ timestamp={config.last_build_time} />
            </p>
          </Container>
        </footer>
      )),
  };
}
