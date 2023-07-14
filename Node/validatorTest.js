const { filterSIDE } = require('../schemas/sideSchema.js')

const { ValidatorTest } = require('../schemas/validatorSchemas.js')

const {config} = require('dotenv')

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

    data.commands.map((e) => {

        const index = e.index
        const advertencias = e.advertencias

        if (e.command == 'type' &&  advertencias) {

            const longitud = e.longitud
            
            const values = []

            if (e.obligatorio) {
                values.push('')
            }

            if (e.longitudIndefinida) {

            }

        }

    })
}

createValidatorTests(path)