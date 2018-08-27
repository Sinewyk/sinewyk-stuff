import { Location } from 'history';
import xs from 'xstream';
import { createElement } from 'snabbdom-pragma';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { extractSinks } from 'cyclejs-utils';
import { Sources, Route } from '../src/interfaces';
import { route } from '../src/routing';
import List_Posts from '../pages/List_Posts';
import Post from '../components/Post';
import Home from '../pages/Home';

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
      DOM: xs.of(<div>Route not found :'(</div>),
    }));

    const page = pageFactory(sources);

    return {
      DOM: page.DOM,
    };
  });

  const pageSinks = extractSinks(pageSinks$, ['DOM']);

  return {
    DOM: xs
      .combine(header.DOM, pageSinks.DOM, footer.DOM)
      .map(([headerDOM, pageDOM, footerDOM]) => (
        <div>
          {headerDOM}
          {pageDOM}
          {footerDOM}
        </div>
      )),
  };
}

export default Site;
