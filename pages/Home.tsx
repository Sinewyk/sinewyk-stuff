import { PageSources } from '../src/interfaces';
import { createElement } from 'snabbdom-pragma';
import { Container } from '../components/Container';

export default function Home(sources: PageSources) {
  return {
    DOM: sources.Params.map(() => (
      <Container>
        <p>Welcome to my stuff </p>
        <p>
          In the future posts & random stuff will be here, for now ... just
          chill
        </p>
        <a href="/posts">My posts</a>
      </Container>
    )),
  };
}
