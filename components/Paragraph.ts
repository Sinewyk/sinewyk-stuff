import { h } from '@cycle/dom';
import { VNodeChildren } from 'snabbdom/h';

import styles from './Paragraph.css';

function Paragraph(children: VNodeChildren) {
  return h(
    'p',
    {
      attrs: {
        class: styles.paragraph,
      },
    },
    children,
  );
}

export { Paragraph, styles };
