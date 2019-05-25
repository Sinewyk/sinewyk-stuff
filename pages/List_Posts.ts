import { h } from '@cycle/dom';
import { PageSources } from '../src/interfaces';
import { Container } from '../components/Container';
import { Paragraph } from '../components/Paragraph';
import { Date_ } from '../components/Date';
import typo from '../styles/typography.css';
import posts from '../posts';

export default function List_Posts(sources: PageSources) {
  const hasPosts = posts.length !== 0;
  return {
    DOM: sources.Params.map(({ pathname }) =>
      Container([
        hasPosts
          ? h('h2', 'Posts:')
          : h('div', [
              h('h2', `No posts yet :'(`),
              Paragraph({}, ['They are coming though !']),
            ]),
        h(
          'ul',
          posts.map(post =>
            h('li', { attrs: { class: typo.reading } }, [
              h(
                'a',
                { attrs: { href: `${pathname}/${post.slug}` } },
                post.title,
              ),
              '   ',
              Date_({ timestamp: post.created_at, format: 'simple' }),
            ]),
          ),
        ),
      ]),
    ),
  };
}
