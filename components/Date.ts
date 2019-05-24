import { h } from '@cycle/dom';

interface Props {
  timestamp: number;
  format?: 'simple';
}

function Date_({ timestamp, format }: Props) {
  const date = new Date(timestamp);
  return h(
    'span',
    {},
    format === 'simple' ? date.toLocaleDateString() : date.toUTCString(),
  );
}

export { Date_ };
