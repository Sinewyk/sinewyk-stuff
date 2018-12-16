import { Stream } from 'xstream';
import { VNode, MainDOMSource } from '@cycle/dom';
import { Location } from 'history';
import { HistoryInput } from '@cycle/history';

export type HistoryStream = Stream<Location>;
export type AnyStream = Stream<any>;

type InitialConfig = {
  last_build_time: number;
  production: boolean;
  git_repository: string;
  github: string;
  pseudo: string;
  email: string;
  twitter: string;
};

export interface Sources {
  DOM: MainDOMSource;
  History: HistoryStream;
  Config: Stream<InitialConfig>;
}

export interface RootSinks {
  DOM: Stream<VNode>;
  History: Stream<HistoryInput | string>;
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
