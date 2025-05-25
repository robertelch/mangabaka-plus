const path = require('path');
const glob = require('glob');

const readerFiles = glob.sync('./src/site-extensions/*/reader.js');
console.log(readerFiles)
const bundledReaders = readerFiles.reduce((entries, filePath) => {
  const match = filePath.match(/site-extensions\\([^\\]+)\\reader\.js$/);
  console.log(match)
  if (match) {
    const extensionName = match[1];
    entries[`${extensionName}.reader`] = "./" + filePath;
  }
  return entries;
}, {});

module.exports = {
  mode: 'development',
  entry: {
    content: './src/content.js',
    ...bundledReaders
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'web',
  devtool: 'source-map',
};
