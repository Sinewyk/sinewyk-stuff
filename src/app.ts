import { combine } from 'most';
import { div, VNode } from '@cycle/dom';
import Site from '../components/Site';
import Footer from '../components/Footer';

import '../styles/body.css';

export default function app() {
  const site = Site();
  const footer = Footer();
  const sinks = {
    DOM: combine<VNode, VNode, VNode[]>(
      (x, y) => [x, y],
      site.DOM,
      footer.DOM,
    ).map(x => div(x)),
  };
  return sinks;
}
