import xs from 'xstream';
import { createElement } from 'snabbdom-pragma';
import { PageSources, Post } from '../src/interfaces';
import posts from '../posts';
import { Container } from './Container';
import NotFound from './NotFound';
import { Date_ } from './Date';

import styles from './Post.css';

export default function Post(sources: PageSources) {
  const history$ = sources.History;
  const params$ = sources.Params;
  return {
    DOM: xs.combine(params$, history$.take(1)).map(([{ slug }]) => {
      const post = posts.find(post => post.slug === slug);

      if (!post) {
        return <NotFound />;
      }

      return (
        <Container>
          <h2 className={styles.title}>{post.title}</h2>
          <div className={styles.post} innerHTML={post.content} />
          <div className={styles.dates}>
            <p>
              Created at: <Date_ timestamp={post.created_at} />
            </p>
            <p>
              Last updated at: <Date_ timestamp={post.updated_at} />
            </p>
          </div>
        </Container>
      );
    }),
  };
}
