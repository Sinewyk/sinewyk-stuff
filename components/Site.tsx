import { Stream } from 'xstream';
import { VNode } from '@cycle/dom';
import { html } from 'snabbdom-jsx';

import styles from './Site.css';

function Site(vdom$: Stream<VNode>) {
  return {
    DOM: vdom$.map(vdom => (
      <div>
        <div className={styles.root}>
          <h1>Welcome to my stuff</h1>
          <p>In the future there will be a blog and stuff</p>
          <p>For now ... just chill</p>
        </div>
        {vdom}
      </div>
    )),
  };
}

export default Site;
