import { h } from '@cycle/dom';
import { PageSources } from 'interfaces';
import posts from 'posts';
import { Container } from './Container';
import NotFound from './NotFound';
import { Date_ } from './Date';

export default function Post(sources: PageSources) {
	const params$ = sources.Params;
	return {
		DOM: params$.map(({ slug }) => {
			const post = posts.find((post) => post.slug === slug);

			if (!post) {
				return NotFound();
			}

			return Container([
				h('h2', { attrs: { class: 'text-center font-bold text-2xl my-4' } }, post.title),
				h('div', {
					attrs: { class: 'mb-16 post' },
					props: { innerHTML: post.content },
				}),
				h('div', { attrs: { class: 'opacity-50' } }, [
					h('p', ['Created at: ', Date_({ timestamp: post.created_at })]),
					h('p', ['Last updated at: ', Date_({ timestamp: post.updated_at })]),
				]),
			]);
		}),
	};
}
