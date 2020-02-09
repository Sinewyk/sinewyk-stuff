import { h } from '@cycle/dom';
import { Sources } from '../src/interfaces';
import { Container } from '../components/Container';
import { Paragraph } from '../components/Paragraph';

export default function Home(sources: Sources) {
  return {
    DOM: sources.Config.map(config =>
      Container([
        Paragraph('⚠️ In construction ⚠️'),
        Paragraph('Welcome to my stuff'),
        Paragraph('This is my playground ... and there is stuff to read too.'),
        h('a', { attrs: { href: '/posts' } }, 'My posts'),
        Paragraph(
          `I'm primarly building this to play around with streams and just
          (reactive?) functional programming in general`,
        ),
        Paragraph(`Here's some info:`),
        h('ul', [
          h('li', [
            h(
              'a',
              { attrs: { href: '/resume.html', target: '_blank' } },
              'My resume/CV',
            ),
          ]),
          h('li', [
            'Email: ',
            h(
              'a',
              { attrs: { target: '_blank', href: `mailto:${config.email}` } },
              config.email,
            ),
          ]),
          h('li', [
            'Twitter: ',
            h(
              'a',
              { attrs: { target: '_blank', href: config.twitter } },
              `@${config.pseudo}`,
            ),
          ]),
          h('li', [
            'Github: ',
            h(
              'a',
              { attrs: { target: '_blank', href: config.github } },
              config.pseudo,
            ),
          ]),
        ]),
      ]),
    ),
  };
}
