import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { captureClicks, makeHistoryDriver } from '@cycle/history';
import app from '../src/app';

import posts from '../posts';
console.log(posts);

const drivers = {
  DOM: makeDOMDriver('#root'),
  History: captureClicks(makeHistoryDriver()),
  Config: () =>
    xs.of({
      last_build_time: __LAST_BUILD_TIME__,
    }),
};

run(app, drivers);
