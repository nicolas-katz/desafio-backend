import { CONFIG_SQL } from './configSQL.js'
const KNEX = require('knex')(CONFIG_SQL)

const select = () => {
    KNEX.from('products').select("*")
    .then((r) => { 
        console.log('OK!')
        return r.map(e => e) 
    })
    .catch(err => console.log(err))
}

const insert = (Obj) =>{
    KNEX('products').insert(Obj)
    .then(() => console.log('OK!'))
    .catch(err => console.log(err))
}

KNEX.schema.createTable('products', createTable =>{
    createTable.increments('id')
    createTable.string('name')
    createTable.integer('price')
    createTable.string('thumbnail')
})
.then(() => console.log('OK!'))
.catch(err => console.log(err))

export default { select, insert, createTable }