import express from 'express'
import Contenedor from './productsList.js'
const app = express()

const server = app.listen(process.env.PORT || 8080, ()=>{
    console.log(`El servidor esta corriendo en el puerto: 8080`)
})

const user = new Contenedor('products.json')
user.read()

app.get('/allProducts', (req, res)=>{
    let showAllProducts = user.getAll()
    res.send(JSON.stringify(showAllProducts))
})

app.get('/randomProduct', (req, res)=>{
    let showAllProducts = user.getAll()
    let getRandom = Math.floor(Math.random() * showAllProducts.length) + 1
    try {
        const showRandomProducts = user.getById(getRandom)
        res.send(JSON.stringify(showRandomProducts))
    } 
    catch(err) {
        res.send('Ocurrio un error.')
    }
})

server.on('error', (err)=>{
    console.log("Hubo un error", err)
})