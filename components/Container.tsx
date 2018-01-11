import { VNode } from '@cycle/dom';
import { createElement } from 'snabbdom-pragma';

import styles from './Container.css';

function Container(_: any, children: VNode) {
  return <div className={styles.container}>{children}</div>;
}

export { Container, styles };
