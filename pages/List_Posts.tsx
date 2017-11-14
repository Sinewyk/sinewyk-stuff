import { PageSources } from '../src/interfaces';
import { createElement } from 'snabbdom-pragma';
import styles from '../styles/reusable.css';

export default function List_Posts(sources: PageSources) {
  return {
    DOM: sources.Params.map(() => (
      <div className={styles.container}>
        <p>My routing is up \o/, no troll, posts are coming >.></p>
      </div>
    )),
  };
}
