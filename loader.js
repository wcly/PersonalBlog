const fs = require('fs');
const globalConfig = require('./config');

let constrollerSet = [];
let pathMap = new Map();

const files = fs.readdirSync(globalConfig['web_path']);

for (let i = 0; i < files.length; i++) {
    const temp = require('./' + globalConfig['web_path'] + "/" + files[i]);

    if (temp.path) {
        for (let [key, value] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value)
            } else {
                throw new Error('url path异常，url:' + key);
            }
        }
        constrollerSet.push(temp)
    }
}

module.exports = pathMap