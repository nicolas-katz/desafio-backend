// Inicio Express.js
import EXPRESS, { static } from 'express';
const APP = EXPRESS();

// Inicio el Router de Express.js
import { Router } from 'express';
const ROUTER = Router();
APP.use('/api/productos', ROUTER);
APP.use(static('./public'))

// Inicio Socket.io
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
const HTTP_SERVER = new HttpServer(APP)
const IO = new IOServer(HTTP_SERVER)

const MESSAGE_CONTAINER = []

// Traigo archivo de DB
require('./DB.js').default
const DB = new DB()

// Rutas GET
APP.get('/', (req, res) => res.sendFile('index.html', {root: __dirname}))

ROUTER.get('/', (req, res) => {
    const GET_DATA = DB.getData()
    res.send(JSON.stringify(GET_DATA))
})

// Rutas IO
IO.on('connection', (socket) =>{
    socket.on('new_product', async (data) => {
        await DB.saveData(data)
        IO.sockets.emit('products', data)
    })
})

IO.on('connection', (socket)=>{
    socket.emit('message', message)
    socket.on('new_message', (data) => {
        data.date = new Date().toLocaleDateString()
        MESSAGE_CONTAINER.push(data)
        IO.sockets.emit('message', [data])
    })
})

// PORT
const PORT = process.env.PORT || 3000

HTTP_SERVER.listen( PORT , () => console.log(`Servidor funcionando en puerto: ${PORT}`))