const fs = require('fs')
module.exports = {
    save: (content, path) => {
        const contentString = JSON.stringify(content, null, 4)
        return fs.writeFileSync(path, contentString)
    },
    load: (path) => {
        const fileBuffer = fs.readFileSync(path, "utf-8")
        return JSON.parse(fileBuffer)
    }
}