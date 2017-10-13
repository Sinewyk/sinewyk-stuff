import xs from 'xstream';
import { div } from '@cycle/dom';
import Site from '../components/Site';
import Footer from '../components/Footer';

import '../styles/body.css';

export default function app() {
  const site = Site();
  const footer = Footer();
  const sinks = {
    DOM: xs.combine(site.DOM, footer.DOM).map(x => div(x)),
  };
  return sinks;
}
