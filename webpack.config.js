const path = require('path');

module.exports = {
  mode: 'development',            
  entry: './src/content.js',     
  output: {
    filename: 'bundle.js',       
    path: path.resolve(__dirname, 'dist'),  
  },
  target: 'web',
  devtool: 'source-map',                  
};
