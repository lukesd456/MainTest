const { readFile } = require('fs/promises')
const {config} = require('dotenv')
const { v4 : uuidV4 } = require('uuid')

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

class ActionSchema {
    constructor (accion, index) {

        //Instancias del objeto
        this.index = index
        this.value = accion.value
        this.command = accion.command
        this.target

        //Instancias para tipo click
        if (accion.command === 'click') {
            this.validador = accion.comment === 'validador'
        }

        //Instancias para tipo type
        if (accion.command === 'type') {
            let mensajesEsperados = accion.comment.split('-')

            //Establecer la longitud
            let longitud = mensajesEsperados.find(e => e.includes('longitud:'))

            if (longitud) {

                const longitudDefault = parseInt(process.env.DEFAULT_LONGITUD)

                longitud = longitud.split(':')[1]
                longitud = longitud !== 'indefinida' ? longitud : longitudDefault
            }

            //Establecer el tipo de dato
            let tipoDeDato = mensajesEsperados.find(e => e.includes('numero') | e.includes('string'))
            
            //Establecer si es obligatorio
            let obligatorio = mensajesEsperados.find(e => e.includes('obligatorio'))
            obligatorio = obligatorio ? true : false

            //Si el apartado es unido, entonces generamos un valor unico para ese valor
            let unico = mensajesEsperados.find(e=>e.includes('unico'))

            this.unico = unico ? true : false

            if (unico) {this.value = toString(uuidV4())}

            //Almacenamos las instancias
            if (longitud) {this.longitud = longitud}
            if (tipoDeDato) {this.tipoDeDato = tipoDeDato}
            if (obligatorio) {this.obligatorio = obligatorio}
        }

        //Instancias generales

        //filtro los ID
        let targets = accion.targets
        targets = targets.filter(e => e[1] !== 'id' | e[1] !== 'name')

        //Separamos los Objetivos CSS y los XPATH
        let xpathObjectives = targets.filter(e => e[1].includes('xpath:'))
        xpathObjectives = xpathObjectives.map((e) => {
            e[0] = e[0].split('xpath=')[1]
            e[1] = e[1].split(':')[1]
            return e
        })

        let xpathObjective

        const typeXPATH = [
            'position',
            'idRelative',
            'attributes',
            'innerText'
        ]

        //Establecemos el XPATH Objective
        typeXPATH.map((t) => {
            if (xpathObjective === undefined) {
                xpathObjective = xpathObjectives.find(e => e[1] === t)
            }
        })

        //Establecemos el CSS Objective
        let cssObjective = targets.filter(e => e[1].includes('css:finder'))
        cssObjective = cssObjective.map((e) => {
            e[0] = e[0].split('css=')[1]
            e[1] = e[1].split(':')[0]
            return e
        })[0]

        //Realizamos un filtro para determinar si existe informacion de xpath o css
        if (xpathObjective === undefined) {
            this.target = {
                location: cssObjective[0],
                detail: cssObjective[1]
            }
        } else {
            this.target = {
                location: xpathObjective[0],
                detail: xpathObjective[1]
            }
        }
    }
}

class SideSchema {
    constructor (JSON) {

        //Filtramos las acciones
        let commands = JSON.tests[0].commands

        //filtrar acciones necesarias
        commands = commands.map(f => f.command === 'click' ? f : f.command === 'type' ? f : false).filter(e => !e === false)

        //Filtramos las acciones
        commands = commands.map((e) => {
            const index = commands.indexOf(e)
            return new ActionSchema(e,index)
        })
        
        //Establecemos las instancias
        this.targetURL = JSON.url
        this.commands = commands
    }
}

const filterSIDE = async () => {
    let file = await readFile('../SideFiles/testAcopio2.side', 'utf-8')

    file = new SideSchema(JSON.parse(file))

    console.log(file)

    // return file
}


filterSIDE()
// module.exports = filterSIDE