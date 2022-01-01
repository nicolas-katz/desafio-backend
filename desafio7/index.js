const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Products = require('./productsList');
const { Router } = express;
const user = new Products("products.json");
const router = Router();
require('dotenv').config();

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/form', (req, res) => {
    const products = user.list
    return res.render('form', {
        list: products
    })
})

app.get('/list', (req, res) => {
    const products = user.list
    return res.render('list', {
        list: products
    })
})

app.get('/fetch', (req, res) => {
    const products = user.list
    res.json(products)
})

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(express.static('./public'))
app.use('/api/productos', router)

router.get('/', (req, res) =>{
    return res.json(user.list)
})

router.get('/:id', (req, res) =>{
    let id = req.params.id
    let product = user.find(id)
    if (product === undefined) return res.send("ID incorrecto")
    res.json(product)
})

router.post('/', (req, res) =>{
    let product = req.body
    let createProduct = {
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail
    }
    res.json(user.insert(createProduct))
    return res.redirect("/list")
})

router.put('/:id', (req, res) =>{
    let product = req.body
    let id = req.params.id
    return res.json(user.update(id, product))
})

router.delete('/:id', (req, res) =>{
    let id = req.params.id
    return res.json(user.delate(id))
})

app.use(function(err, req, res, next) {
    res.status(err.status || 404).send({
        error: "Ocurrio un error 4xx"
    })  
    next()
})

app.listen(process.env.PORT || 8080)
