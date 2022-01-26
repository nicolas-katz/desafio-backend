import config from './config/config.js';
const knex = require('knex')(config);

knex.schema.createTable('productos', table =>{
    table.increments('id')
    table.string('_name')
    table.integer('price')
    table.string('thumbnail')
})
    .then(() => console.log("Tabla creada"))
    .catch(e => console.log(e))
    .finally(() => knex.destroy())

const _read = async (req, res) => {
    try {
        knex.from('productos').select('*')
            .then(producto => console.table(producto))
            .finally(()=> knex.destroy())
    } catch (e) {
        console.log(e)
    }
}

const _readById = async (req, res) => {
    try {
        const productos = await get()
        const id = parseInt(req.params.id)
        return productos.find(p => p.id === id) 
    } catch (e) {
        console.log(e)
    }
}

const _create = async (req, res) => {
    try {
        const producto = req.body
        knex('productos').insert(producto)
            .then(() => console.log("Se añadio correctamente el producto: " + producto))
            .finally(() => knex.destroy())
    } catch (e) {
        console.log(e)
    }
}

const _update = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const new_name = req.body.name
        knex.from('productos').where('id', '=', id)
            .update({name: new_name})
            .then(() => console.log("Producto actualizado"))
            .finally(() => knex.destroy())
    } catch (e) {
        console.log(e)
    }
}

const _delete = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        knex.from('productos').where('id', '=', id)
            .then(() => console.log("Producto eliminado"))
            .finally(() => knex.destroy())
    } catch (e) {
        console.log(e)
    }
}

export default { _read, _readById, _create, _update, _delete }