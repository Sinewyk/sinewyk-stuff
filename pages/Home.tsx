import xs from 'xstream';
import { createElement } from 'snabbdom-pragma';
import { Container } from '../components/Container';
import { Paragraph } from '../components/Paragraph';

export default function Home() {
  return {
    DOM: xs.of(
      <Container>
        <Paragraph> ! In construction !</Paragraph>
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
      </Container>,
    ),
  };
}
