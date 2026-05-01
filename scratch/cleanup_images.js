const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const imagesDir = path.join(rootDir, 'assets', 'images');

// 1. Get all image files in assets/images
if (!fs.existsSync(imagesDir)) {
    console.error("Images directory not found.");
    process.exit(1);
}

const allImageFiles = fs.readdirSync(imagesDir).filter(f => !fs.statSync(path.join(imagesDir, f)).isDirectory());

// 2. Find all referenced files
const referencedFiles = new Set();

function searchInFiles(dir, extArray) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (!['node_modules', '.git', 'scratch', '.gemini'].includes(file)) {
                searchInFiles(fullPath, extArray);
            }
        } else {
            const ext = path.extname(file);
            if (extArray.includes(ext)) {
                const content = fs.readFileSync(fullPath, 'utf8');
                // Regex to find things like assets/images/filename.jpg or url('assets/images/...')
                // Also match basic filenames that match our images just in case
                const matches = content.match(/[a-zA-Z0-9_\-\.]+\.(jpg|jpeg|png|gif|webp|svg|avif|mp4)/gi);
                if (matches) {
                    for (const match of matches) {
                        referencedFiles.add(path.basename(match));
                    }
                }
            }
        }
    }
}

searchInFiles(rootDir, ['.html', '.css', '.js', '.xml', '.json']);

// 3. Keep specific important files just in case (e.g. apple-touch-icon.png if we had it, but we only have logo.png)
// The regex above will catch logo.png.

// 4. Compare and delete
const toDelete = [];
const kept = [];

for (const img of allImageFiles) {
    // If it's referenced directly by name somewhere in the code
    if (referencedFiles.has(img)) {
        kept.push(img);
    } else {
        toDelete.push(img);
    }
}

console.log("--- KEPT FILES ---");
console.log(kept.join('\n'));

console.log("\n--- DELETED FILES ---");
for (const file of toDelete) {
    console.log(file);
    fs.unlinkSync(path.join(imagesDir, file));
}

console.log(`\nDeleted ${toDelete.length} unused files.`);
