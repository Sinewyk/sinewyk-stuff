import { Stream } from 'xstream';
import { VNode, DOMSource } from '@cycle/dom';
import { Location } from 'history';
import { HistoryInput } from '@cycle/history';

export type Sources = {
  DOM: DOMSource;
  History: Stream<Location>;
  Config: Stream<any>;
};

export type RootSinks = {
  DOM: Stream<VNode>;
  History: Stream<HistoryInput>;
};

export type Sinks = Partial<RootSinks>;
export type Component = (s: Sources) => Sinks;
