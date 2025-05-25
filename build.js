const { execSync } = require('child_process');

try {
  execSync('node ./scripts/make-barrels.js site-extensions', { stdio: 'inherit' });
  execSync('node ./scripts/make-barrels.js custom-pages', { stdio: 'inherit' });
  execSync('node ./scripts/build-manifest.js', { stdio: 'inherit' });
  execSync('node ./scripts/move-json.js', { stdio: 'inherit' });
  execSync('npx webpack', { stdio: 'inherit' });
} catch (err) {
  process.exit(err.status || 1);
}
