const fs = require('fs')

class Contenedor{
    constructor(nombre_archivo){
        this.nombre_archivo = nombre_archivo
    }

    static products = []
    static setID = 0

    async save(Object){
        try {
            Contenedor.setID++
            Object.id = Contenedor.setID
            Contenedor.products.push(Object)

            await this.write()

            return Contenedor.setID++
        } catch (err) {
            console.log(err)
        }
    }

    async write(){
        await fs.promises.writeFile(this.nombre_archivo, JSON.stringify(Contenedor.products))
    }

    async getById(Number){
        let readId = ''
        try{
            readId = Contenedor.products.find(e => e.id == Number) || null
            return readId
        } 
        catch(err){
            console.log(err)
        }
    }
    
    getAll(){
        return Contenedor.products
    }

    async deleteById(Number){
        Contenedor.products = Contenedor.products.filter(e => e.id !== Number)
        Contenedor.products.length === 1 ? this.write() : this.deleteAll()
    }

    async deleteAll(){
        return await fs.promises.writeFile(this.nombre_archivo, '')
    }
    
    async read(){
        try{
            let data = await fs.promises.readFile(this.nombre_archivo, 'utf-8')
            Contenedor.products = JSON.parse(data)
    
            let lastId = 0
            for(let element of Contenedor.products){
                if(element.id > lastId) lastId = element.id
            }
            Contenedor.setID = lastId
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = Contenedor

const usuario = new Contenedor("products.json")

usuario.read()

usuario.save({title: "Remera Boca", price: 300, thumbnail: "https://i.pinimg.com/originals/ea/a5/b8/eaa5b8417e9e95389c1680098cad1348.jpg"})

usuario.getById(1)

usuario.getById(5)

usuario.getAll()

usuario.deleteById(1)

usuario.deleteAll()