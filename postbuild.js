const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');

let baseDir = 'dist'

fs.readdir(`./${baseDir}`, (err, files) => {
    let html = []
    let fromRegExp = [
        '(src=")(\S+)(\.js")',
        '(src=")(\S+)(\.png")',
        '(src=")(\S+)(\.svg")',
        '(src=")(\S+)(\.jpg")',
        '(href=")(\S+)(\.css")',
        '(href=")(\S+)(\.ico")',
        '(srcset=")(\S+)(\.png")',
        '(srcset=")(\S+)(\.jpg")',
        '(srcset=")(\S+)(\.webp")'
    ]

    files.forEach(file => {
        if (file.match(/.+\.(html)$/)) {
            console.log('html match', file)
            html.push(file)
        }
    });

    console.log('html', html)

    html.forEach(file => {
        fromRegExp.forEach(reg => {
            let options = {
                files: path.join(baseDir, file),
                from: new RegExp(reg , 'g'),
                to: '$1../$2$3'
            }
            try {
                let changedFiles = replace.sync(options);
                console.log('Modified files:', changedFiles.join(', '));
            } catch (error) {
                console.error('Error occurred:', error);
            }
        })
    })

});