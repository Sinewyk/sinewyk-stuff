import { Stream } from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { Location } from 'history';
import { HistoryInput } from '@cycle/history';

export type HistoryStream = Stream<Location>;
export type AnyStream = Stream<any>;

export interface Sources {
  DOM: DOMSource;
  History: HistoryStream;
  Config: AnyStream;
}

export interface RootSinks {
  DOM: Stream<VNode>;
  History: Stream<HistoryInput>;
}

export type PageSources = Sources & {
  Params: AnyStream;
};

export type Sinks = Partial<RootSinks>;
export interface Component {
  (s: Sources): Sinks;
}

export interface Route {
  path: string;
  value: any;
}

export interface Post {
  title: string;
  slug: string;
  created_at: number;
  updated_at: number;
  content: string;
}
