const path = require('path');
const glob = require('glob');
const fs = require('fs').promises;

async function copyJsonToDist(srcPath, newFileName) {
  try {
    const destPath = path.join("./dist", newFileName);

    await fs.copyFile(srcPath, destPath);

    console.log(`${newFileName} moved to ./dist`);
  } catch (error) {
    console.error('Error copying file:', error);
  }
}
async function main() {
  const siteExtensionsDir = path.resolve(__dirname, '../src/site-extensions');
  const pattern = path.join(siteExtensionsDir, '*/data.json');
  const globPattern = pattern.split(path.sep).join('/');

  const extensionFiles = glob.sync(globPattern);

  for (const filePath of extensionFiles) {
    const normalizedPath = filePath.split(path.sep).join('/');
    const match = normalizedPath.match(/site-extensions\/([^/]+)\/data\.json$/);

    if (match) {
      const newFileName = `${match[1]}.data.json`;
      await copyJsonToDist(normalizedPath, newFileName);
    }
  }
}

main();