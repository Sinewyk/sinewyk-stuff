import { h } from '@cycle/dom';
import { PageSources } from '../src/interfaces';
import labs from '../labs';
import { Container } from '../components/Container';
import NotFound from '../components/NotFound';

export default function Labs(sources: PageSources) {
  return {
    DOM: sources.Params.map(({ slug, pathname }) => {
      const lab = labs.find(lab => lab.slug === slug);

      if (pathname !== '/labs' && lab === undefined) {
        return NotFound();
      }
      return Container(
        h(
          'ul',
          labs.map(lab =>
            h(
              'li',
              h(
                'a',
                {
                  attrs: { href: `${pathname}/${lab.slug}`, target: '_blank' },
                },
                lab.title,
              ),
            ),
          ),
        ),
      );
    }),
  };
}
