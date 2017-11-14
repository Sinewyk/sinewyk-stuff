import { PageSources } from '../src/interfaces';
import { createElement } from 'snabbdom-pragma';
import styles from '../styles/reusable.css';
import typo from '../styles/typography.css';

export default function List_Posts(sources: PageSources) {
  return {
    DOM: sources.Params.map(() => (
      <div className={styles.container}>
        <p className={typo.reading}>
          My routing is up \o/, no troll, posts are coming >.>
        </p>
      </div>
    )),
  };
}
