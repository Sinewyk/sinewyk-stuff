import { h } from '@cycle/dom';
import xs from 'xstream';
import { Sources } from '../src/interfaces';
import { Container } from './Container';
import { Date_ } from './Date';

import styles from './Footer.css';

export default function Footer(sources: Sources) {
  return {
    DOM: xs
      .combine(sources.History, sources.Config)
      .map(([{ pathname }, config]) =>
        h(
          'footer',
          {
            attrs: {
              class: styles.root,
            },
          },
          Container([
            pathname !== '/'
              ? h(
                  'p',
                  h(
                    'a',
                    {
                      attrs: { class: styles.link, href: '/' },
                    },
                    'Home',
                  ),
                )
              : '',
            h(
              'p',
              h(
                'a',
                {
                  attrs: {
                    class: styles.link,
                    target: '_blank',
                    href: config.git_repository,
                  },
                },
                'Source code',
              ),
            ),
            h(
              'p',
              {
                attrs: { title: config.last_build_time },
              },
              [
                'Latest release: ',
                Date_({ timestamp: config.last_build_time }),
              ],
            ),
          ]),
        ),
      ),
  };
}
