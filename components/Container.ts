import { h } from '@cycle/dom';
import { VNodeChildren } from 'snabbdom/h';

import styles from './Container.css';

function Container(children: VNodeChildren) {
	return h(
		'div',
		{
			attrs: { class: styles.container },
		},
		children,
	);
}

export { Container, styles };
