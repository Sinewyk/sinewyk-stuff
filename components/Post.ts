import { h } from '@cycle/dom';
import xs from 'xstream';
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
        return NotFound();
      }

      return Container([
        h('h2', { attrs: { class: styles.title } }, post.title),
        h('div', {
          attrs: { class: styles.post },
          props: { innerHTML: post.content },
        }),
        h('div', { attrs: { class: styles.dates } }, [
          h('p', ['Created at: ', Date_({ timestamp: post.created_at })]),
          h('p', ['Last updated at: ', Date_({ timestamp: post.updated_at })]),
        ]),
      ]);
    }),
  };
}
