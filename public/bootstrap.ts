import xs from 'xstream';
import { setup, run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { captureClicks, makeHistoryDriver } from '@cycle/history';
import app from '../src/app';

const makeConfigDriver = () =>
	xs.of({
		last_build_time: __LAST_BUILD_TIME__,
		production: process.env.NODE_ENV === 'production',
		pseudo: 'sinewyk',
		git_repository: 'https://github.com/Sinewyk/sinewyk-stuff',
		github: 'https://github.com/Sinewyk',
		email: 'sinewyk@gmail.com',
		twitter: 'https://twitter.com/sinewyk',
	});

if (process.env.NODE_ENV === 'production') {
	const drivers = {
		DOM: makeDOMDriver('#root'),
		History: captureClicks(makeHistoryDriver()),
		Config: makeConfigDriver,
	};

	run(app, drivers);
} else {
	const { restartable, rerunner } = require('cycle-restart');

	const makeDrivers = () => ({
		DOM: restartable(makeDOMDriver('#root'), {
			pauseSinksWhileReplaying: false,
		}),
		History: captureClicks(makeHistoryDriver()),
		Config: makeConfigDriver,
	});

	const rerun = rerunner(setup, makeDrivers);

	// bypass some weird bug :o
	setTimeout(() => {
		rerun(app);
	}, 0);

	if ((module as any).hot) {
		(module as any).hot.accept('../src/app', () => {
			rerun(app);
		});
	}
}
