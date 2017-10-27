import * as pathToRegexp from 'path-to-regexp';

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

export const matchPath = (
  pathname: string,
  options: MatchPathOptions | string = {},
) => {
  if (typeof options === 'string') {
    options = { path: options };
  }

  const {
    path = '/',
    exact = false,
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
