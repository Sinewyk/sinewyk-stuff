import { createElement } from 'snabbdom-pragma';
import { VNode } from '@cycle/dom';

interface Props {
  timestamp: number;
  format?: 'simple';
}

function Date_({ timestamp, format }: Props): VNode {
  const date = new Date(timestamp);
  return (
    <span>
      {format === 'simple' ? date.toLocaleDateString() : date.toUTCString()}
    </span>
  );
}

export { Date_ };
