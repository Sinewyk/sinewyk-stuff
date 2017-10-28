import { Location } from 'history';
import xs from 'xstream';
import { createElement } from 'snabbdom-pragma';
import Footer from './Footer';
import Header from './Header';
import { extractSinks } from 'cyclejs-utils';
import { Sources, Route } from '../src/interfaces';
import { route } from '../src/routing';
import List_Posts from '../pages/List_Posts';

const routes: Route[] = [
  { path: '/posts', value: List_Posts },
  { path: '/', value: List_Posts },
];

function Site(sources: Sources) {
  const footer = Footer(sources.Config);
  const header = Header();

  const pageSinks$ = sources.History.map((location: Location) => {
    const { pathname } = location;

    const pageFactory = route(pathname, routes, () => ({
      DOM: xs.of(<div />),
    }));

    const page = pageFactory(sources);

    return {
      DOM: page.DOM,
    };
  });

  const pageSinks = extractSinks(pageSinks$, ['DOM']);

  return {
    DOM: xs
      .combine(footer.DOM, header.DOM, pageSinks.DOM)
      .map(([footerDOM, headerDOM, pageDOM]) => (
        <div>
          {headerDOM}
          {pageDOM}
          {footerDOM}
        </div>
      )),
  };
}

export default Site;
