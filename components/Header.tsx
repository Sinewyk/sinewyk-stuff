import { createElement } from 'snabbdom-pragma';
import { HistoryStream, Sources } from '../src/interfaces';

import styles from './Header.css';

export default function Header(sources: Sources) {
  const history$: HistoryStream = sources.History;
  return {
    DOM: history$.map(
      ({ pathname }) =>
        pathname === '/' ? (
          <div>
            <header className={styles.header} />
            <div className={styles.sub}>
              <p className={styles.name}>Serge 'Sinewyk' Havas</p>
              <p>Welcome to my stuff </p>
              <p>
                In the future posts & random stuff will be here, for now ...
                just chill
              </p>
            </div>
          </div>
        ) : (
          <header className={styles.header} />
        ),
    ),
  };
}
