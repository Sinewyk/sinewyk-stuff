import { h } from '@cycle/dom';
import { Sources } from '../src/interfaces';
import { Container } from './Container';
import { back } from '../src/back';

import styles from './Header.css';

const reflectacles =
  'These are "Reflectacles Ghost" on my face if you are curious';

export default function Header(sources: Sources) {
  const history$ = sources.History;
  return {
    DOM: history$.map(({ pathname }) =>
      pathname === '/'
        ? h('header', [
            h('div', { attrs: { class: styles.headerIndex } }),
            h('div', {
              attrs: {
                class: styles.avatar,
                title: reflectacles,
              },
            }),
            h(
              'div',
              {
                attrs: { class: `${styles.sub}` },
              },
              h(
                'p',
                { attrs: { class: styles.name } },
                `Serge 'Sinewyk' Havas`,
              ),
            ),
          ])
        : h('header', [
            h('div', { attrs: { class: styles.header } }),
            h('div', {
              attrs: { class: styles.avatar },
              title: reflectacles,
            }),
            Container([
              h(
                'a',
                {
                  attrs: {
                    class: styles.navigationLinks,
                    href: back(pathname),
                  },
                },
                'Back',
              ),
              ' ',
              h(
                'a',
                { attrs: { class: styles.navigationLinks, href: '/' } },
                'Home',
              ),
            ]),
          ]),
    ),
  };
}
