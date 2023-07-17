const { filterSIDE } = require('../schemas/sideSchema.js')

const { ValidatorTest, ValidatorTestJSON } = require('../schemas/validatorSchemas.js')
const { generarNumeroAleatorio, generarPalabraAleatoria } = require('../utils/functions.js')

const {config} = require('dotenv')
const { writeJson } = require('./jsonWriter.js')

config()

const path = '../SideFiles/testAcopio2.side'
const resultPath = '../Results/validatorTests.json'

const createValidatorTests = async (path) => {

    const data = await filterSIDE(path)

    const tests = []

    const testsToDo = data.commands.filter(e => e.advertencias)

    testsToDo.map((e) => {

        const commands = data.commands.map(c => c)
        const index = e.index
        const longitudIndefinida = e.longitudIndefinida
        const advertencias = e.advertencias
        const tipoDeDato = e.tipoDeDato
        const obligatorio = e.obligatorio

        const arrayTests = []

        tipoDeDato === 'numero' && arrayTests.push({
            tipoDeTest: 'tipoDeDato',
            value: generarPalabraAleatoria(e.longitud)
        })

        obligatorio && arrayTests.push({
            tipoDeTest: 'obligatorio',
            value: ''
        })

        !longitudIndefinida && arrayTests.push({
            tipoDeTest: 'longitud',
            value: generarNumeroAleatorio(e.longitud+20)
        })

        arrayTests.map((t) => {
            const value = t.value
            const tipoDeTest = t.tipoDeTest

            tests.push(new ValidatorTest(tipoDeTest, advertencias, commands, index, value))
        })

    })



    writeJson(new ValidatorTestJSON('Test de validaciones', tests, data.targetURL), resultPath)

}

createValidatorTests(path)