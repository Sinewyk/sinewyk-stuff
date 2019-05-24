import { h } from '@cycle/dom';
import { VNodeChildren } from 'snabbdom/h';

import styles from './Paragraph.css';

interface Props {
  className?: string;
}

function Paragraph({ className }: Props, children: VNodeChildren) {
  return h(
    'p',
    {
      attrs: {
        class: `${styles.paragraph}${className ? ` ${className}` : ''}`,
      },
    },
    children,
  );
}

export { Paragraph, styles };
