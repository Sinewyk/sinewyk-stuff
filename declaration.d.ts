declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.md' {
  const content: string;
  export default content;
}

declare var __LAST_BUILD_TIME__: number;
