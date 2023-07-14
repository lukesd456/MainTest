const { writeFile } = require('fs/promises')

const writeJson = async (file, path) => {
    await writeFile(path, JSON.stringify(file), 'utf-8')
}

module.exports = { writeJson }