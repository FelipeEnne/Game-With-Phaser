const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    'production-dependencies': ['phaser'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};
