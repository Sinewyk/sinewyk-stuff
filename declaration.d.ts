declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.md' {
  const content: string;
  const _atime: number;
  const _mtime: number;
  const _ctime: number;
  const _birthtime: number;
  export default content;
  export { _atime, _mtime, _ctime, _birthtime };
}

declare var __LAST_BUILD_TIME__: number;

declare module 'cycle-restart' {
  export function rerunner(foo: any, bar: any): any;
  export function restartable(fn: any, options: any): any;
}
