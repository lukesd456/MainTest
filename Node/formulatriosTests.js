const { filterSIDE } = require("../schemas/sideSchema");
const { getRandomNumber, generarPalabraAleatoria, generarNumeroAleatorio } = require("../utils/functions");
const { writeJson } = require("./jsonWriter");

const mainRoutine = '../SideFiles/testprincipal.side'

let modulesRoutes = [
    'formularios_altitud.side',
    'formularios_audio.side',
    'formularios_descripcion.side',
    'formularios_fecha.side',
    'formularios_firma.side',
    'formularios_fotografia.side',
    'formularios_numeros.side',
    'formularios_poligono.side',
    'formularios_texto.side',
    'formularios_ubicacion.side'
]

modulesRoutes = modulesRoutes.map(e => '../SideFiles/'+e)

const opcionesMultiples = '../SideFiles/formularios_opcionMultiple.side' 

const opcionUnica = '../SideFiles/formularios_opcionUnica.side'

const confirmacionGuardarOpciones = '../SideFiles/formularios_opciones_confirmacion_guardar.side'

const agregarOpcion = '../SideFiles/formularios_opciones_agregaropciones_accion.side'

const guardarFormulario = '../SideFiles/formularios_formularios_confirmacion_guardar.side'

const createTestsFormularios = async (numeroDeModulos, numeroDeOpciones) => {

    let dataModules = []

    for (let i = 0; i < modulesRoutes.length ; i++) {
        const data = await filterSIDE(modulesRoutes[i])
        dataModules.push(data.commands)
    }

    let mainAction = await filterSIDE(mainRoutine)

    let dataOpcionesMultiples = await filterSIDE(opcionesMultiples)

    let dataOpcionUnica = await filterSIDE(opcionUnica)

    const dataAgregarOpcion = await filterSIDE(agregarOpcion)

    const dataGuardarOpciones = await filterSIDE(confirmacionGuardarOpciones)

    const dataGuardarFormulario = await filterSIDE(guardarFormulario)

    for (let i = 0; i < numeroDeModulos; i++) {
        const indice = getRandomNumber(0,dataModules.length)

        const accionModule = dataModules[indice]

        accionModule.map(e=>mainAction.commands.push(e))
    }

    //Agregar opciones a test de Opciones Unicas y multiples

    for (let i = 0; i < numeroDeOpciones; i++) {
        const dataOpcion = dataAgregarOpcion.commands.map((e) => {
            
            let value

            if (e.tipoDeDato === 'string') {
                value = generarPalabraAleatoria(e.longitud)
            } else {
                value = generarNumeroAleatorio(e.longitud)
            }

            return {
                ...e, value
            }
        })

        dataOpcion.map(e => dataOpcionesMultiples.commands.push(e))
        dataOpcion.map(e => dataOpcionUnica.commands.push(e))

    }

    //Agregamos las acciones para guardar la pregunta

    dataGuardarOpciones.commands.map((e) => {
        dataOpcionesMultiples.commands.push(e)
        dataOpcionUnica.commands.push(e)
    })

    //Agregamos las opciones multiples y unicas a la accion principal

    dataOpcionUnica.commands.map(e => mainAction.commands.push(e))
    dataOpcionesMultiples.commands.map(e => mainAction.commands.push(e))

    //Agregamos la accion de guardar formulario

    dataGuardarFormulario.commands.map(e => mainAction.commands.push(e))

    //Actualizamos los indices

    mainAction.commands = mainAction.commands.map((e) => {
        const index = mainAction.commands.indexOf(e)
        return {
            ...e,index
        }
    })

    //Exportamos el JSON

    console.log(mainAction)

    writeJson(mainAction, '../Results/formularios.json')


}

createTestsFormularios(500,500)