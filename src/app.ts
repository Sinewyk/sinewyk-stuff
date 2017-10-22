import xs, { Stream } from 'xstream';
import { div, VNode } from '@cycle/dom';
import Site from '../components/Site';
import Footer from '../components/Footer';
import { Sources, RootSinks } from './interfaces';

import '../styles/body.css';

function view(sources: Sources): Stream<VNode> {
  const site = Site();
  const footer = Footer(sources.Config);

  return xs.combine(site.DOM, footer.DOM).map(x => div(x));
}

export default function app(sources: Sources): RootSinks {
  const sinks = {
    DOM: view(sources),
    History: xs.never(),
  };
  return sinks;
}
