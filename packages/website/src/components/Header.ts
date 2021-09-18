import { h } from '@cycle/dom';
import { Sources } from 'interfaces';
import { Container } from './Container';
import { back } from 'back';

const styles: any = {
	avatar: 'avatar relative -top-12 -mb-12 h-24 w-24 bg-cover mx-auto rounded-full shadow-lg',
	navigationLinks: 'mr-4 mt-4',
};

const reflectacles = 'These are "Reflectacles Ghost" on my face if you are curious';

export default function Header(sources: Sources) {
	const history$ = sources.History;
	return {
		DOM: history$.map(({ pathname }) =>
			pathname === '/'
				? h('header', [
						h('div', { attrs: { class: 'header_photo bg-cover bg-bottom' } }),
						h('div', {
							attrs: {
								class: styles.avatar,
								title: reflectacles,
							},
						}),
						h(
							'div',
							{
								attrs: { class: 'px-4 mx-auto sm:max-w-screen-sm text-center' },
							},
							h('p', { attrs: { class: 'font-bold text-xl my-4' } }, `Serge 'Sinewyk' Havas`),
						),
				  ])
				: h('header', [
						h('div', { attrs: { class: 'header_gradient' } }),
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
							h('a', { attrs: { class: styles.navigationLinks, href: '/' } }, 'Home'),
						]),
				  ]),
		),
	};
}
