import { createElement } from 'snabbdom-pragma';
import { Sources } from '../src/interfaces';
import { styles as ContainerStyles } from './Container';
import { Paragraph } from './Paragraph';
import { back } from '../src/back';

import styles from './Header.css';

export default function Header(sources: Sources) {
  const history$ = sources.History;
  return {
    DOM: history$.map(
      ({ pathname }) =>
        pathname === '/' ? (
          <header>
            <div className={styles.header} />
            <div className={`${styles.sub} ${ContainerStyles.container}`}>
              <Paragraph className={styles.name}>
                Serge 'Sinewyk' Havas
              </Paragraph>
            </div>
          </header>
        ) : (
          <header>
            <div className={styles.header} />
            <div className={ContainerStyles.container}>
              <a className={styles.navigationLinks} href={back(pathname)}>
                Back
              </a>{' '}
              <a className={styles.navigationLinks} href="/">
                Home
              </a>
            </div>
          </header>
        ),
    ),
  };
}
