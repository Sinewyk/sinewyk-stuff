const fs = require('fs');

const parseInt10 = int => parseInt(int, 10);

module.exports = function(code) {
  const callback = this.async();

  fs.stat(this.resourcePath, (err, stats) => {
    if (err) {
      callback(err);
      return;
    }

    callback(
      null,
      `${code}
export const _atime = ${parseInt10(stats.atimeMs)};
export const _mtime = ${parseInt10(stats.mtimeMs)};
export const _ctime = ${parseInt10(stats.ctimeMs)};
export const _birthtime = ${parseInt10(stats.birthtimeMs)};`,
    );
  });

  return;
};
