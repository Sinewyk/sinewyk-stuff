import { h } from '@cycle/dom';
import { Location } from 'history';
import xs from 'xstream';
import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFound from 'components/NotFound';
import { extractSinks } from 'cyclejs-utils';
import { Sources, Route } from 'interfaces';
import { route } from 'routing';
import List_Posts from 'pages/List_Posts';
import Post from 'components/Post';
import Home from 'pages/Home';

const routes: Route[] = [
	{ path: '/', value: Home },
	{ path: '/posts', value: List_Posts },
	{ path: '/posts/:slug', value: Post },
];

function Site(sources: Sources) {
	const footer = Footer(sources);
	const header = Header(sources);

	const pageSinks$ = sources.History.map((location: Location) => {
		const { pathname } = location;

		const pageFactory = route(pathname, routes, () => ({
			DOM: xs.of(NotFound()),
		}));

		const page = pageFactory(sources);

		return {
			DOM: page.DOM!,
		};
	});

	const pageSinks = extractSinks(pageSinks$, ['DOM']);

	return {
		DOM: xs
			.combine(header.DOM, pageSinks.DOM, footer.DOM)
			.map(([headerDOM, pageDOM, footerDOM]) => h('div', [headerDOM, pageDOM, footerDOM])),
	};
}

export default Site;
