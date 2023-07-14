class ValidatorTest {
    constructor (tipoDeTest,advertencias, commands, index, value) {

        let routine = commands.map((r) => {
            if (r.index === index) {
                return {
                    ...r,
                    value: value
                }
            } else return r            
        })

        this.tipoDeTest = tipoDeTest
        this.advertencias = advertencias
        this.index = index
        this.commands = routine
    }
}

class ValidatorTestJSON {
    constructor(tipoDeTest, tests, targetURL) {
        this.tipoDeTest = tipoDeTest
        this.targetURL = targetURL
        this.tests = tests
    }
}

module.exports = { ValidatorTest, ValidatorTestJSON }