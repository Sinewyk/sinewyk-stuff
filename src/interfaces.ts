import { Stream } from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { Location } from 'history';
import { HistoryInput } from '@cycle/history';

export interface Sources {
  DOM: DOMSource;
  History: Stream<Location>;
  Config: Stream<any>;
}

export interface RootSinks {
  DOM: Stream<VNode>;
  History: Stream<HistoryInput>;
}

export type PageSources = Sources & {
  Params: Stream<any>;
};

export type Sinks = Partial<RootSinks>;
export interface Component {
  (s: Sources): Sinks;
}

export interface Route {
  path: string;
  value: any;
}
