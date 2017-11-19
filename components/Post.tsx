import xs from 'xstream';
import { createElement } from 'snabbdom-pragma';
import { HistoryStream, PageSources, Post } from '../src/interfaces';
import posts from '../posts';

import styles from './Post.css';

export default function Post(sources: PageSources) {
  const history$: HistoryStream = sources.History;
  const params$ = sources.Params;
  return {
    DOM: xs.combine(params$, history$).map(([{ slug }]) => {
      const post = posts.find(post => post.slug === slug) as Post;
      return (
        <div>
          <h2 className={styles.title}>{post.title}</h2>
          <div className={styles.post} innerHTML={post.content} />
        </div>
      );
    }),
  };
}
