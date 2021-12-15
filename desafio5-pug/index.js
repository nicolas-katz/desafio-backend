const express = require('express');
const Products = require('./productsList');
const { Router } = express;
const user = new Products("products.json");
const app = express();
const router = Router();
require('dotenv').config();

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    return res.render('form')
})
app.get('/list', (req, res) => {
    const products = user.list
    if (products.length === 0) return res.render('no-list')
    return res.render('list', {
        list: products
    })
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
    return res.json(user.insert(createProduct))
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