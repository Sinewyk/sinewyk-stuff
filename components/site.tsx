import xs from 'xstream';
import { html } from 'snabbdom-jsx';

function Site() {
  return {
    DOM: xs.of(
      <div>
        <h1>Welcome to my stuff</h1>
        <p>In the future there will be a blog and stuff</p>
        <p>For now ... just chill</p>
      </div>,
    ),
  };
}

export default Site;
