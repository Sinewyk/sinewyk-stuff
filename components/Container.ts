import { VNode, h } from '@cycle/dom';

import styles from './Container.css';

function Container(children: Array<VNode | string> | undefined) {
  return h(
    'div',
    {
      attrs: { class: styles.container },
    },
    children,
  );
}

export { Container, styles };
