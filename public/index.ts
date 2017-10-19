import { run } from '@cycle/most-run';
import { makeDOMDriver } from '@cycle/dom';
import app from '../src/app';

const drivers = {
  DOM: makeDOMDriver('#root'),
};

run(app, drivers);
