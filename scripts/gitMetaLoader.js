const fs = require('fs');
const { exec } = require('child_process');
const R = require('ramda');

const split_new_line = R.split('\n');
const filter_empty_string = R.filter(x => x !== '');
const parse_int_10 = int => parseInt(int, 10);
const multiply_by_1000 = x => x * 1000;

const get_first_js_timestamp = R.pipe(
  R.head,
  parse_int_10,
  multiply_by_1000,
);
const get_last_js_timestamp = R.pipe(
  R.tail,
  parse_int_10,
  multiply_by_1000,
);
const get_timestamp_array = R.pipe(
  split_new_line,
  filter_empty_string,
);

module.exports = function(code) {
  const callback = this.async();

  exec(
    `git log --follow --format=%at ${this.resourcePath}`,
    (error, stdout, stderr) => {
      if (error || stderr) {
        callback(error || new Error(stderr));
        return;
      }

      const times = get_timestamp_array(stdout);

      callback(
        null,
        `${code}
export const _updated_at = ${get_first_js_timestamp(times)};
export const _created_at = ${get_last_js_timestamp(times)};`,
      );
    },
  );

  return;
};
