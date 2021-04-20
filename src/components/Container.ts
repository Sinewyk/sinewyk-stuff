import { h } from '@cycle/dom';
import { VNodeChildren } from 'snabbdom/h';

function Container(children: VNodeChildren) {
	return h(
		'div',
		{
			attrs: { class: 'px-4 mx-auto sm:max-w-screen-sm' },
		},
		children,
	);
}

export { Container };
