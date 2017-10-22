import { Location } from 'history';
import xs, { Stream } from 'xstream';
import { div, VNode } from '@cycle/dom';
import { extractSinks } from 'cyclejs-utils';
import Site from '../components/Site';
import Footer from '../components/Footer';
import { Sources, RootSinks } from './interfaces';

import '../styles/body.css';

function view(sources: Sources, vdom$: Stream<VNode>): Stream<VNode> {
  const site = Site(vdom$);
  const footer = Footer(sources.Config);

  return xs.combine(site.DOM, footer.DOM).map(x => div(x));
}

export default function app(sources: Sources): RootSinks {
  const history$ = sources.History;

  const pageSinks$ = history$.map((location: Location) => {
    const { pathname } = location;
    console.log(pathname);

    // fake routing, it's the homepage
    return {
      DOM: xs.of(
        div(
          'Just playing around with my router, posts and random things will be here soon',
        ),
      ),
    };
  });

  const pageSinks = extractSinks(pageSinks$, ['DOM']);

  const sinks = {
    DOM: view(sources, pageSinks.DOM),
    History: xs.never(),
  };
  return sinks;
}
