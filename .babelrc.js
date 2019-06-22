const isTesting = process.env.TESTING === 'true';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: !isTesting, // Don't debug per file (jest) :')
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-transform-inline-environment-variables',
  ],
};
