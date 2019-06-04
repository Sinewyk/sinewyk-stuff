const isProd = process.env.NODE_ENV === 'production';
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
};
