import { h } from '@cycle/dom';
import { PageSources } from 'interfaces';
import NotFound from './NotFound';

// @TODO: generate this at build time
// @TODO: design this page actually, remove header + footer ?
const FAKE_LIST = [{ id: 'time', title: 'Time', port: 8001 }];

export default function OneStuff(sources: PageSources) {
	const params$ = sources.Params;
	return {
		DOM: params$.map(({ slug }) => {
			const stuff = FAKE_LIST.find((stuff) => stuff.id === slug);

			if (!stuff) {
				return NotFound();
			}

			return h(
				'div',
				{
					attrs: { class: 'w-full h-full' },
				},
				[
					h('h2', { attrs: { class: 'text-center font-bold text-2xl my-4' } }, stuff.title),
					h('iframe', { attrs: { id: 'stuff', src: `http://localhost:${stuff.port}` } }),
				],
			);
		}),
	};
}
