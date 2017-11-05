import { PageSources } from '../src/interfaces';
import { createElement } from 'snabbdom-pragma';
import styles from '../styles/reusable.css';

export default function Home(sources: PageSources) {
  return {
    DOM: sources.Params.map(() => (
      <div className={styles.container}>
        <p>Welcome to my stuff </p>
        <p>
          In the future posts & random stuff will be here, for now ... just
          chill
        </p>
        <a href="/posts">My posts</a>
      </div>
    )),
  };
}
