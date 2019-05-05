import { createElement } from 'snabbdom-pragma';
import { Sources } from '../src/interfaces';
import { Container } from '../components/Container';
import { Paragraph } from '../components/Paragraph';

export default function Home(sources: Sources) {
  return {
    DOM: sources.Config.map(config => (
      <Container>
        <Paragraph>⚠️ In construction ⚠️</Paragraph>
        <Paragraph>Welcome to my stuff</Paragraph>
        <Paragraph>
          This is my playground ... and there is stuff to read too.
        </Paragraph>
        <a href="/posts">My posts</a>
        <Paragraph>
          I'm primarly building this to play around with streams and just
          (reactive?) functional programming in general
        </Paragraph>
        <Paragraph>My resume will be here soon too</Paragraph>
        <Paragraph>Here's some info dump for now:</Paragraph>
        <ul>
          <li>
            Email:{' '}
            <a target="_blank" href={`mailto:${config.email}`}>
              {config.email}
            </a>
          </li>
          <li>
            Twitter:{' '}
            <a target="_blank" href={config.twitter}>{`@${config.pseudo}`}</a>
          </li>
          <li>
            Github:{' '}
            <a target="_blank" href={config.github}>{`${config.pseudo}`}</a>
          </li>
        </ul>
      </Container>
    )),
  };
}
