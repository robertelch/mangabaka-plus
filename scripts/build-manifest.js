const path = require('path');
const glob = require('glob');
const fs = require('fs');

const siteExtensionsDir = path.resolve(__dirname, '../src/site-extensions');
const pattern = path.join(siteExtensionsDir, '*/reader.js');

const globPattern = pattern.split(path.sep).join('/');

const readerFiles = glob.sync(globPattern);

console.log('Glob pattern:', globPattern);
console.log('Reader files found:', readerFiles);
console.log('AH');

const bundledReaders = readerFiles.reduce((entries, filePath) => {
  const normalizedPath = filePath.split(path.sep).join('/');

  const match = normalizedPath.match(/site-extensions\/([^/]+)\/reader\.js$/);

  if (match) {
    const extensionName = match[1];
    entries.push(`${extensionName}.reader.bundle.js`)
  }

  return entries;
}, []);


path.resolve(__dirname, 'dist')
const manifest = {
  "manifest_version": 3,
  "name": "MangaBaka+",
  "version": "1.0",
  "description": "Upgrades mangabaka.dev by adding new features such as outlinks to different new sites",
  "host_permissions": ["https://mangabaka.dev/*"],
  "permissions": ["tabs","storage"],
  "browser_specific_settings": {
  "gecko": {
      "id": "mangabakaplus@crumbling.solania.de"
    }
  },
  "content_scripts": [
    {
      "matches": ["https://mangabaka.dev/*"],
      "js": ["content.bundle.js"],
      "run_at": "document_idle"
    }
  ],
  "web_accessible_resources": [
    {
      "resources": ["*.json",...bundledReaders],
      "matches": ["https://mangabaka.dev/*"]
    }
  ]
}

const manifestPath = path.resolve(__dirname, '../dist', 'manifest.json');

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

console.log(`Manifest saved to ${manifestPath}`);