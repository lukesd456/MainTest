const readline = require('readline-sync')
const { config } = require('dotenv')
const { generarNumeroAleatorio, generarPalabraAleatoria } = require('../utils/functions.js')

config()

const longitudDefault = process.env.DEFAULT_LONGITUD

const createJSONAppium = async () => {

    let comandos = []

    let continueWriting = true

    
    let index = 0

    while (continueWriting) {

        index ++
        let target = readline.question('Cual es la ubicacion del objetivo? :')
        let comando = readline.question('Cual es el comando a realizar? ')

        if (comando === 'type') {

            //Datos para comando tipo Type
            let tipoDeDato = readline.question('Cual es el tipo de dato?: opciones(string o numero) ')

            let longitud = readline.question('Cual es su longitud? responde con un numero o indefinida ')

            longitud = longitud == 'indefinida' ? longitudDefault : parseInt(longitud)

            
            let value = tipoDeDato == 'string' ? generarPalabraAleatoria(longitud) : generarNumeroAleatorio(longitud)

            let obligatorio = readline.question('Es obligatorio? si o no ') == 'si' ? true : false
            let unico = readline.question('Es unico el valor? si o no ') == 'si' ? true : false

            comandos.push({
                target,
                comando,
                tipoDeDato,
                longitud,
                value,
                obligatorio,
                unico
            })
        
        } else {
    
            //Datos para comando tipo click
            let validador = readline.question('Este click es un validador? si o no') == 'si' ? true : false

            comandos.push({
                index,
                target,
                comando,
                validador
            })

        }
        
        let continuar = readline.question('Le gustaría continuar o quiere cerrar?')

        //Terminar el bucle
        continueWriting = continuar == 'si' ? true : false
    }

    console.log(comandos)

}

createJSONAppium()