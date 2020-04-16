const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');

let baseDir = 'dist'

fs.readdir(`./${baseDir}`, (err, files) => {
    let html = []
    let fromtoRegExp = [
        {from:'(src=")(.*)(\.js")', to:'$1../assets/$2$3'},
        {from:'(href=")(.*)(\.css")',to:'$1../assets/$2$3'},
        {from:'(src=")(.*)(\.png")', to:'$1../assets/images/$2$3'},
        {from:'(src=")(.*)(\.svg")', to:'$1../assets/images/$2$3'},
        {from:'(src=")(.*)(\.jpg")', to:'$1../assets/images/$2$3'},
        {from:'(href=")(.*)(\.ico")', to:'$1../assets/images/$2$3'},
        {from:'(srcset=")(.*)(\.webp")', to:'$1../assets/images/$2$3'},
        {from:'(srcset=")(.*)(\.jpg")', to:'$1../assets/images/$2$3'},
        {from:'(srcset=")(.*)(\.png")', to:'$1../assets/images/$2$3'},
        {from:'(href=")en/(.*)(.html")', to:'$1$2$3'},
        {from:'(<a href=“)(.*)(\.html" class="nav-link" id="trtoen">TR</a>)', to:'$1../$2$3',},
        {from:'(href=“)(pdf/)(.*)(.pdf”)', to:'$1../$2$3$4'},
    ]

    files.forEach(file => {
        if (file.match(/.+\.(html)$/)) {
            console.log('html match', file)
            html.push(file)
        }
    });

    console.log('html', html)

    html.forEach(file => {
        fromtoRegExp.forEach(reg => {
                let options = {
                    files: path.join(baseDir, file),
                    from: new RegExp(reg.from , 'g'),
                    to: reg.to
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