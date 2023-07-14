const { writeFile } = require('fs/promises')

const path = '../Results/validatorTests.json'

const writeJson = async (file) => {
    await writeFile(path, JSON.stringify(file), 'utf-8')
}

module.exports = { writeJson }