const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const dirFile = path.join(dir, file);
        try {
            filelist = walkSync(dirFile, filelist);
        } catch (err) {
            if (err.code === 'ENOTDIR' || err.code === 'EBADF') {
                if (dirFile.match(/\.(html|xml|txt|py|js|css)$/)) {
                    filelist.push(dirFile);
                }
            }
        }
    });
    return filelist;
};

const allFiles = walkSync(__dirname);

allFiles.forEach(file => {
    if (file.includes('replace-script.js') || file.includes('node_modules') || file.includes('.git')) return;
    
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/Hiro Barbershop/g, 'Hiro Barbershop');
    content = content.replace(/HIRO BARBERSHOP/g, 'HIRO BARBERSHOP');
    content = content.replace(/hirobarbershop/g, 'hirobarbershop');
    content = content.replace(/HIRO/g, 'HIRO');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated:', file);
    }
});

console.log('All replacements done!');
