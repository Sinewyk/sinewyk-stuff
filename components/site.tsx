import xs from 'xstream';
import { html } from 'snabbdom-jsx';

import siteCss from './site.css';

function Site() {
  return {
    DOM: xs.of(
      <div className={siteCss.header}>
        <h1>Welcome to my stuff</h1>
        <p>In the future there will be a blog and stuff</p>
        <p>For now ... just chill</p>
      </div>,
    ),
  };
}

export default Site;
