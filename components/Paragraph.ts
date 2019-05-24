import { VNode, h } from '@cycle/dom';

import styles from './Paragraph.css';

interface Props {
  className?: string;
}

function Paragraph(
  { className }: Props,
  children: Array<VNode | string> | undefined,
) {
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
