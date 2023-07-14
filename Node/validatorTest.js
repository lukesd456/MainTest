const { filterSIDE } = require('../schemas/sideSchema.js')

const { ValidatorTest, ValidatorTestJSON } = require('../schemas/validatorSchemas.js')

const {config} = require('dotenv')
const { writeJson } = require('./jsonWriter.js')

config()

const generarPalabraAleatoria = (longitud) => {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    let palabra = '';
  
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * alfabeto.length);
      const letra = alfabeto.charAt(indice);
      palabra += letra;
    }
  
    return palabra;
}

const generarNumeroAleatorio = (longitud) => {
    let numero = '';
    
    for (let i = 0; i < longitud; i++) {
      const digito = Math.floor(Math.random() * 10); // Generar un dígito aleatorio entre 0 y 9
      numero += digito;
    }
    
    return numero;
}

const path = '../SideFiles/testAcopio2.side'

const createValidatorTests = async (path) => {

    const data = await filterSIDE(path)

    const tests = []

    const testsToDo = data.commands.filter(e => e.advertencias)

    testsToDo.map((e) => {

        const index = e.index
        const longitudIndefinida = e.longitudIndefinida
        const advertencias = e.advertencias
        const tipoDeDato = e.tipoDeDato
        const obligatorio = e.obligatorio
        const defaultValue = e.value

        if (!longitudIndefinida) {

            tests.push(new ValidatorTest('longitud', advertencias, data.commands, index, generarNumeroAleatorio(e.longitud+10)))

        }

        if (tipoDeDato === 'numero') {

            tests.push(new ValidatorTest('tipo de dato', advertencias,data.commands, index, generarPalabraAleatoria(e.longitud)))
        }

        if (obligatorio) {

            tests.push(new ValidatorTest('obligatorio', advertencias,data.commands,index, '' ))
        }

        data.commands[index].value = defaultValue
        // console.log(defaultValue)
        // console.log(data.commands[index].value)

    })

    console.log(tests[1])

    writeJson(new ValidatorTestJSON('Test de validaciones', tests, data.targetURL))

    // console.log(data.targetURL)

}

createValidatorTests(path)