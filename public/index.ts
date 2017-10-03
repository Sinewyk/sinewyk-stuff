import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import Site from '../components/site';

import '../styles/body.css';

function main() {
  const site = Site();
  const sinks = {
    DOM: site.DOM,
  };
  return sinks;
}

const drivers = {
  DOM: makeDOMDriver('#root'),
};

run(main, drivers);
