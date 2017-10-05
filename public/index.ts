import { run } from '@cycle/run';
import xs from 'xstream';
import { div, makeDOMDriver, VNode } from '@cycle/dom';
import Site from '../components/Site';
import Footer from '../components/Footer';

import '../styles/body.css';

const wrapInADiv = (x: Array<VNode>) => div(x);

function main() {
  const site = Site();
  const footer = Footer();
  const sinks = {
    DOM: xs.combine(site.DOM, footer.DOM).map(wrapInADiv),
  };
  return sinks;
}

const drivers = {
  DOM: makeDOMDriver('#root'),
};

run(main, drivers);
