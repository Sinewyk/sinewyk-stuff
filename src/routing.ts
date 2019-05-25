import * as pathToRegexp from 'path-to-regexp';
import xs from 'xstream';
import concat from 'xstream/extra/concat';
import { Sources, Route, WrappedComponent } from '../src/interfaces';
/**
 * Stole most of this from react-router matchPath
 */

interface CompiledPattern {
  re: RegExp;
  keys: pathToRegexp.Key[];
}

interface Cache {
  [key: string]: CompiledPatternCache;
}

interface CompiledPatternCache {
  [key: string]: CompiledPattern;
}

const patternCache: Cache = {};

const compilePath = (
  pattern: string,
  options: pathToRegexp.RegExpOptions,
): CompiledPattern => {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) {
    return cache[pattern];
  }

  const keys: pathToRegexp.Key[] = [];
  const re = pathToRegexp(pattern, keys, options);
  const compiledPattern = { re, keys };

  cache[pattern] = compiledPattern;

  return compiledPattern;
};

interface MatchPathOptions {
  path?: string;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
}

const matchPath = (
  pathname: string,
  options: MatchPathOptions | string = {},
) => {
  if (typeof options === 'string') {
    options = { path: options };
  }

  const {
    path = '/',
    exact = true,
    strict = false,
    sensitive = false,
  } = options;
  const { re, keys } = compilePath(path, { end: exact, strict, sensitive });
  const match = re.exec(pathname);

  if (!match) {
    return null;
  }

  const [url, ...values] = match;
  const isExact = pathname === url;

  if (exact && !isExact) {
    return null;
  }

  return {
    path, // the path pattern used to match
    url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
    isExact, // whether or not we matched exactly
    params: keys.reduce((memo: { [key: string]: string }, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {}),
  };
};

export function route(
  pathname: string,
  routes: Route[],
  defaultComponent: WrappedComponent,
): WrappedComponent {
  return routes.reduce((_, route) => {
    if (_ !== defaultComponent) {
      return _;
    }
    const didMatch = matchPath(pathname, route.path);
    if (didMatch) {
      return (sources: Sources) =>
        route.value({
          Params: concat(
            xs.of({ ...didMatch.params, pathname }),
            xs.never(),
          ).remember(),
          ...sources,
        });
    }
    return defaultComponent;
  }, defaultComponent);
}
