const path = require('path');

module.exports = {
  mode: 'development',             // or 'development' for unminified
  entry: './src/content.js',      // your main JS file
  output: {
    filename: 'bundle.js',        // output filename
    path: path.resolve(__dirname, 'dist'),  // output folder
  },
  target: 'web',
  devtool: 'source-map',                  // target environment
};
