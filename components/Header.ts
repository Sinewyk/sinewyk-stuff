import { h } from '@cycle/dom';
import { Sources } from '../src/interfaces';
import { Container, styles as ContainerStyles } from './Container';
import { Paragraph } from './Paragraph';
import { back } from '../src/back';

import styles from './Header.css';

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
                title:
                  'These are "Reflectacles Ghost" on my face if you are curious',
              },
            }),
            h(
              'div',
              {
                attrs: { class: `${styles.sub} ${ContainerStyles.container}` },
              },
              [
                Paragraph({ className: styles.name }, [
                  `Serge 'Sinewyk' Havas`,
                ]),
              ],
            ),
          ])
        : h('header', [
            h('div', { attrs: { class: styles.header } }),
            h('div', {
              attrs: { class: styles.avatar },
              title:
                'These are "Reflectacles Ghost" on my face if you are curious',
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
              h('a', { attrs: { class: styles.navigationLinks, href: '/' } }, [
                'Home',
              ]),
            ]),
          ]),
    ),
  };
}
