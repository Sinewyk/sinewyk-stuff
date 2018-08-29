import { VNode } from '@cycle/dom';
import { createElement } from 'snabbdom-pragma';

import styles from './Paragraph.css';

interface Props {
  className?: string;
}

function Paragraph({ className }: Props, children: VNode) {
  return <p className={`${styles.paragraph} ${className}`}>{children}</p>;
}

export { Paragraph, styles };
