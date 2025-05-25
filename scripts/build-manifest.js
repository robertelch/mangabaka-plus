const path = require('path');
const glob = require('glob');
const fs = require('fs');

// Construct the pattern for glob, normalized for any platform
const siteExtensionsDir = path.resolve(__dirname, '../src/site-extensions');
const pattern = path.join(siteExtensionsDir, '*/reader.js');

// Use forward slashes in glob pattern (glob requires posix-style slashes)
const globPattern = pattern.split(path.sep).join('/');

const readerFiles = glob.sync(globPattern);

console.log('Glob pattern:', globPattern);
console.log('Reader files found:', readerFiles);
console.log('AH');

const bundledReaders = readerFiles.reduce((entries, filePath) => {
  // Normalize the path separators for matching regex safely
  const normalizedPath = filePath.split(path.sep).join('/');

  // Extract the extension name from path
  const match = normalizedPath.match(/site-extensions\/([^/]+)\/reader\.js$/);

  if (match) {
    const extensionName = match[1];
    // Use path.relative for consistent relative paths
    entries = []
    const relativePath = './' + path.relative(__dirname, filePath).split(path.sep).join('/');
    entries.push(`${extensionName}.reader.bundle.js`)
  }

  return entries;
}, {});


console.log(bundledReaders)
path.resolve(__dirname, 'dist')
const manifest = {
  "manifest_version": 3,
  "name": "JSON Search Injector",
  "version": "1.0",
  "description": "Injects content and searches JSON",
  "host_permissions": ["https://mangabaka.dev/*"],
  "permissions": ["tabs"],
  "content_scripts": [
    {
      "matches": ["https://mangabaka.dev/*"],
      "js": ["content.bundle.js"],
      "css": ["style.css"],
      "run_at": "document_idle"
    }
  ],
  "web_accessible_resources": [
    {
      "resources": ["data.json","*.json",...bundledReaders],
      "matches": ["https://mangabaka.dev/*"]
    }
  ],
    "background": {
      "service_worker": "background.js"
  }
}

const manifestPath = path.resolve(__dirname, '../dist', 'manifest.json');

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

console.log(`Manifest saved to ${manifestPath}`);