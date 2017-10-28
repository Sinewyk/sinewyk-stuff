import xs from 'xstream';
import Site from '../components/Site';
import { Sources, RootSinks } from './interfaces';

import '../styles/body.css';

export default function app(sources: Sources): RootSinks {
  return {
    DOM: Site(sources).DOM,
    History: xs.never(),
  };
}
