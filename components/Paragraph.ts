import { h } from '@cycle/dom';
import { VNodeChildren } from 'snabbdom/h';

function Paragraph(children: VNodeChildren) {
	return h(
		'p',
		{
			attrs: {
				class: 'my-4',
			},
		},
		children,
	);
}

export { Paragraph };
