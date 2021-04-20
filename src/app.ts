import xs from 'xstream';
import Site from './Site';
import { Sources, RootSinks } from './interfaces';

import 'styles/styles.css';

export default function app(sources: Sources): RootSinks {
	const sinks = Site(sources);
	return { DOM: sinks.DOM, History: xs.empty() };
}
