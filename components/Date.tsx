import { createElement } from 'snabbdom-pragma';
import { VNode } from '@cycle/dom';

interface Props {
  timestamp: number;
}

function Date_({ timestamp }: Props): VNode {
  return <span>{new Date(timestamp).toUTCString()}</span>;
}

export { Date_ };
