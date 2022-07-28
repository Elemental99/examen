const express = require('express')
const cors = require('cors')

const app = express()
const ruta = express.Router()
const puerto = 2500

//Consultar
let apuestas = []
app.use(cors()).use(express.json())

ruta.get('/', (req, res) => {
    res.status(200).send(apuestas)
})

//Insertar
ruta.post('/', (req, res) => {
    const { body } = req
    if (apuestas.filter((c) => c.codigo == body.codigo).length > 0) {
        return res.status(400).send({
            message: 'El codigo ya existe',
            response: body,
        })
    }
    apuestas.push(body)
    res.status(201).send({
        message: 'El dato se inserto correctamente',
        response: body,
    })
})

//Update
ruta.put('/:id', (req, res) => {
    const { id } = req.params
    const { body } = req
    if (apuestas.filter((c) => c.codigo == id).length == 0) {
        return res.status(400).send({
            message: 'No se encuentra la apuesta que desea modificar',
        })
    }
    let comida = apuestas.filter((c) => c.codigo == id)[0]
    comida.codigo = body.codigo
    comida.fecha = body.fecha
    comida.evento = body.evento
    comida.resultado = body.resultado
    comida.valor_apostado = body.valor_apostado
    if (comida.estado === 'apostado') {
        comida.estado = body.estado
    } else {
        comida.estado = 'apostado'
    }
    comida.estado = body.estado
    res.status(200).send({
        message: 'Dato modificado con exito',
        response: comida,
    })
})

//Delete
ruta.delete('/:id', (req, res) => {
    const { id } = req.params
    if (apuestas) {
        apuestas.filter((c) => c.codigo !== id)
        res.status(200).send({
            message: 'Dato eliminado con exito',
        })
    } else {
        return res.status(400).send({
            message: 'No se encuentra la apuesta que desea eliminar',
        })
    }
})

app.use('/', ruta)

app.listen(puerto, () => {
    console.log(`Servidor Ejecutado en puerto: ${puerto}`)
})
