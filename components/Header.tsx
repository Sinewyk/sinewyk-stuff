import { createElement } from 'snabbdom-pragma';
import { HistoryStream, Sources } from '../src/interfaces';
import { styles as ContainerStyles } from './Container';

import styles from './Header.css';

export default function Header(sources: Sources) {
  const history$: HistoryStream = sources.History;
  return {
    DOM: history$.map(
      ({ pathname }) =>
        pathname === '/' ? (
          <header className="">
            <div className={styles.header} />
            <div className={`${styles.sub} ${ContainerStyles.container}`}>
              <p className={styles.name}>Serge 'Sinewyk' Havas</p>
            </div>
          </header>
        ) : (
          <header className={styles.header} />
        ),
    ),
  };
}
