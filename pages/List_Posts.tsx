import { PageSources } from '../src/interfaces';
import { createElement } from 'snabbdom-pragma';

export default function List_Posts(sources: PageSources) {
  return {
    DOM: sources.Params.map(() => <div>My routing is up \o/</div>),
  };
}
