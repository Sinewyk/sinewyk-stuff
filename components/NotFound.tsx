import { createElement } from 'snabbdom-pragma';

import { Container } from './Container';

function NotFound() {
  return <Container>Route not found :'(</Container>;
}

export { NotFound, NotFound as default };
