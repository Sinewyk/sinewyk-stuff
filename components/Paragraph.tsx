import { VNode } from '@cycle/dom';
import { createElement } from 'snabbdom-pragma';

import styles from './Paragraph.css';

interface Props {
  className?: string;
}

// @TODO (sinewyk): track https://github.com/Swizz/snabbdom-pragma/issues/28 ?
function Paragraph(props: Props, children: VNode) {
  return (
    <p className={`${styles.paragraph} ${props && props.className}`}>
      {children}
    </p>
  );
}

export { Paragraph, styles };
