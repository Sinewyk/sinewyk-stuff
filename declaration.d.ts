declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.md' {
  const content: string;
  export default content;
}

declare var __LAST_BUILD_TIME__: number;

declare module 'cycle-restart' {
  export function rerunner(foo: any, bar: any): any;
  export function restartable(fn: any, options: any): any;
}
