import { h } from '@cycle/dom';
import { PageSources } from '../src/interfaces';
import { Container } from '../components/Container';
import { Paragraph } from '../components/Paragraph';
import { Date_ } from '../components/Date';
import posts from '../posts';

export default function List_Posts(sources: PageSources) {
	const hasPosts = posts.length !== 0;
	return {
		DOM: sources.Params.map(({ pathname }) =>
			Container([
				hasPosts
					? h('h2', { attrs: { class: 'my-4 font-bold text-3xl' } }, 'Posts:')
					: h('div', [h('h2', `No posts yet :'(`), Paragraph('They are coming though !')]),
				h(
					'ul',
					{ attrs: { role: 'list', class: 'list-disc' } },
					posts.map((post) =>
						h('li', { attrs: { class: 'ml-4' } }, [
							h('a', { attrs: { href: `${pathname}/${post.slug}` } }, post.title),
							'   ',
							Date_({ timestamp: post.created_at, format: 'simple' }),
						]),
					),
				),
			]),
		),
	};
}
