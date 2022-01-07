import express, { static } from 'express'
import { ROUTER } from 'express'
const ROUTER = Router()
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import Contenedor from './contenedor.js'
const USER = new Contenedor('./products.json')

const APP = express()
const HTTP_SERVER = new HttpServer(APP)
const IO = new IOServer(HTTP_SERVER)

APP.use(static('./public'))

APP.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

APP.get('/test', (req, res) => {
    const PRODUCTS = USER.getAll()
    res.json(PRODUCTS)
})

IO.on('connection', async socket => {
    const PRODUCTS = await archivo.getAll()
    console.log(PRODUCTS)
    let NOW = new Date().toLocaleTimeString()
    console.log(`[${NOW}] Se abrió una nueva conexión con Socket.io`)

    socket.emit('products', PRODUCTS)

})

APP.use('/api/productos', ROUTER)

const PORT = process.env.PORT || 3000

HTTP_SERVER.listen( PORT, () => console.log(`Escuchando por puerto ${PORT}`))