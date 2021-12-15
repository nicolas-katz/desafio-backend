const express = require('express');
const { Router } = express;
const Contenedor = require('./productsList.js');
const user = new Contenedor('/productsList.js');
const app = express();
const router = Router();

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
    return res.render('form')
})
app.get('/list', async (req, res) => {
    return res.render('list', {
        list: await archivo.getAll()
    })
})

app.use(express.json())
app.use(urlencoded({ extended : true }))
app.use('/api/productos', router)
app.use(express.static('public'))

router.get('/', (req, res) =>{
    try {
        return res.json(user.getAll())
    } catch(err) {
        res.send({error: "Producto no encontrado"})
    }
})

router.get('/:id', async (req, res) =>{
    try {
        let ID = Number(req.params.id)
        const product = await user.getById(ID)
        if (product === undefined) return res.send("ID incorrecto")
        res.json(product)
    } catch(err) {
        res.send({error: "Producto no encontrado"})
    }
})

router.post('/', async (req, res) =>{
    try {
        const product = req.body
        const createProduct = {
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail
        }
        await user.save(createProduct)
        return res.redirect('/')
    } catch(err){
        res.send({error: "Producto no encontrado"})
    }
})

router.put('/:id', (req, res) =>{
    try {
        let ID = Number(req.params.id)
        const products = user.getAll()
        if (ID < 1 || ID > products.length) return res.send('ID incorrecto')
        const updateProduct = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail,
            id: ID
        }
        products[ID - 1] = updateProduct
        res.json(products)
    } catch(err) {
        res.send({error: "Producto no encontrado"})
    }
})

router.delete('/:id', async (req, res) =>{
    try {
        const ID = Number(req.params.id)
        const delate = await user.deleteById(ID)
        if (delate === undefined) return res.send("ID incorrecto")
        res.json({delate})
    } catch (err){
        res.send({error: "Producto no encontrado"})
    }
})

app.listen(process.env.PORT || 8080)
app.use(function(err, req, res, next) {
    res.status(err.status || 404).send({
        err: {
        status: err.status || 404,
        message: err.message || "Pagina no encontrada."
        }
    })  
    next()
})