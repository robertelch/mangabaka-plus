const path = require('path');
const glob = require('glob');
const fs = require('fs');


// Creates a barrel file for a directory where every subdirectory has an index.js file
function getBarrel(topFolder) {
    const siteExtensionsDir = path.resolve(__dirname, `../src/${topFolder}`);
    const pattern = path.join(siteExtensionsDir, '*/index.js');
    
    const globPattern = pattern.split(path.sep).join('/');

    const extensionFiles = glob.sync(globPattern);

    const extensions = extensionFiles.reduce((entries, filePath) => {
        const normalizedPath = filePath.split(path.sep).join('/');
        const regex = new RegExp(`/${topFolder}/([^/]+)/index\\.js$`);
        const match = normalizedPath.match(regex);

        if (match) {
            const extensionName = match[1];
            entries.push(extensionName)
        }

        return entries;
    }, []);

    path.resolve(__dirname, 'src/site-extensions')

    str = ""

    extensions.forEach(extension => {
        str += `import ${extension} from "./${extension}"\n`
    });
    str += `\nexport default [${extensions}]`
    return str
}
const folderName = process.argv[2];

if (!folderName) {
    throw new Error('No directory specified');
}
else {
    const barrelContent = getBarrel(folderName);

    const barrelPath = path.resolve(__dirname, `../src/${folderName}`, 'barrel.js');

    fs.writeFileSync(barrelPath, barrelContent);

    console.log(`Extension barrel saved to ${barrelPath}`);
}