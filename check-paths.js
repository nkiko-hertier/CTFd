// check-paths.js
const { glob } = require('glob');
const path = require('path');
const tailwindConfig = require('./tailwind.config.js');

async function checkPaths() {
    const contentPaths = tailwindConfig.content;
    
    if (!contentPaths || contentPaths.length === 0) {
        console.log('No content paths found in tailwind.config.js');
        return;
    }

    console.log('Searching for files matching these patterns:');
    console.log(contentPaths);

    const allFiles = new Set();
    for (const pattern of contentPaths) {
        const files = await glob(pattern, { ignore: 'node_modules/**', absolute: false });
        files.forEach(file => allFiles.add(file));
    }

    const fileList = Array.from(allFiles).sort();
    console.log('\nFound the following files:');
    console.log(fileList.join('\n'));
    console.log(`\nTotal files found: ${fileList.length}`);
}

checkPaths();