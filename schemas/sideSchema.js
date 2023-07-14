const { readFile } = require('fs/promises')
const {config} = require('dotenv')
const { generarNumeroAleatorio } = require('../utils/functions.js')

config()

const DEFAULT_LONGITUD = parseInt(process.env.DEFAULT_LONGITUD)

class ActionSchema {
    constructor (accion, index) {

        //Instancias del objeto
        this.index = index
        this.value = accion.value
        this.command = accion.command
        this.target
        
        //Apartados Click
        this.validador

        //Apartados Type
        this.longitudIndefinida
        this.longitud
        this.advertencias
        this.obligatorio
        this.unico
        this.tipoDeDato

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
                longitud = longitud.split(':')[1]

                this.longitudIndefinida = longitud === 'indefinida' ? true : false
                const longitudDefault = DEFAULT_LONGITUD

                longitud = longitud !== 'indefinida' ? parseInt(longitud) : longitudDefault


            }

            //Establecer Advertencias
            let advertencias = mensajesEsperados.find(e => e.includes('advertencias:'))

            if (advertencias) {
                advertencias = advertencias.split(':')[1].split('|')
                this.advertencias = advertencias
            } else {
                this.advertencias = false
            }

            //Establecer el tipo de dato
            let tipoDeDato = mensajesEsperados.find(e => e.includes('numero') | e.includes('string'))
            
            //Establecer si es obligatorio
            let obligatorio = mensajesEsperados.find(e => e.includes('obligatorio'))
            obligatorio = obligatorio ? true : false

            //Si el apartado es unido, entonces generamos un valor unico para ese valor
            let unico = mensajesEsperados.find(e=>e.includes('unico'))

            this.unico = unico ? true : false

            if (unico) {this.value = generarNumeroAleatorio(longitud)}

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
            'idRelative',
            'position',
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
                detail: 'xpath'
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

const filterSIDE = async (path) => {
    let file = await readFile(path, 'utf-8')

    file = new SideSchema(JSON.parse(file))

    return file
}

module.exports = { filterSIDE }