const { filterSIDE } = require('../schemas/sideSchema.js')

const { config } = require('dotenv')
const { generarNumeroAleatorio, generarPalabraAleatoria } = require('../utils/functions.js')
const { writeJson } = require('./jsonWriter.js')
const { clonateTestJson } = require('../schemas/validatorSchemas.js')
config()

const path = '../SideFiles/testAcopio2.side'

const filterAleatory = (commands) => {
    let dataCommands = commands

    dataCommands = dataCommands.map((e) => {
        
    })
}

const createMultipleTests = async (path, numeroTests) => {
    const data = await filterSIDE(path)

    let tests = Array(numeroTests)


    for (let i = 0; i < tests.length; i++) {
        tests[i] = undefined;
    }


    tests = tests.map((t) => {
        return {
            ...data,
            commands: data.commands.map((e) => {

                const longitud = e.longitud

                if (e.advertencias) {

                    if (e.tipoDeDato === 'numero') {
                        return {
                            ...e,
                            value: generarNumeroAleatorio(longitud)
                        }
                    } else {
                        return {
                            ...e,
                            value: generarPalabraAleatoria(longitud)
                        }
                    }

                } else return { ...e }

            })
        }
    })

    const path2 = '../Results/clonateTests.json'

    writeJson(new clonateTestJson('clonar tests', tests, data.targetURL, numeroTests), path2)

}

createMultipleTests(path, 50)