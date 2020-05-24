import { h } from '@cycle/dom';
import { Sources } from '../src/interfaces';
import { Container } from '../components/Container';
import { Paragraph } from '../components/Paragraph';

export default function Home(sources: Sources) {
	return {
		DOM: sources.Config.map((config) =>
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
							{
								attrs: {
									href: '/resume.html',
									target: '_blank',
									rel: 'noreferrer',
								},
							},
							'My resume/CV',
						),
					]),
					h('li', [
						'Email: ',
						h(
							'a',
							{
								attrs: {
									href: `mailto:${config.email}`,
									target: '_blank',
									rel: 'noreferrer',
								},
							},
							config.email,
						),
					]),
					h('li', [
						'Twitter: ',
						h(
							'a',
							{
								attrs: {
									href: config.twitter,
									target: '_blank',
									rel: 'noreferrer',
								},
							},
							`@${config.pseudo}`,
						),
					]),
					h('li', [
						'Github: ',
						h(
							'a',
							{
								attrs: {
									href: config.github,
									target: '_blank',
									rel: 'noreferrer',
								},
							},
							config.pseudo,
						),
					]),
				]),
			]),
		),
	};
}
