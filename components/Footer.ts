import { h } from '@cycle/dom';
import xs from 'xstream';
import { Sources } from '../src/interfaces';
import { Container } from './Container';
import { Date_ } from './Date';

export default function Footer(sources: Sources) {
	return {
		DOM: xs.combine(sources.History, sources.Config).map(([{ pathname }, config]) =>
			h(
				'footer',
				{
					attrs: {
						class: 'text-center bg-gray-200 mt-10 text-gray-500 border-t border-b border-gray-300',
					},
				},
				Container([
					pathname !== '/'
						? h(
								'p',
								{
									attrs: { class: 'my-4' },
								},
								h(
									'a',
									{
										attrs: { class: 'text-gray-500', href: '/' },
									},
									'Home',
								),
						  )
						: '',
					h(
						'p',
						{
							attrs: { class: 'my-4' },
						},
						h(
							'a',
							{
								attrs: {
									class: 'text-gray-500',
									href: config.git_repository,
									target: '_blank',
									rel: 'noreferrer',
								},
							},
							'Source code',
						),
					),
					h(
						'p',

						{
							attrs: { class: 'my-4', title: config.last_build_time },
						},
						['Latest release: ', Date_({ timestamp: config.last_build_time })],
					),
				]),
			),
		),
	};
}
