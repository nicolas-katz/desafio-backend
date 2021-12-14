const Contenedor = require('./KatzNicolas.js')

async function runProgram() {
    const usuario2 = new Contenedor('products2.json')

    await usuario2.read()
    await usuario2.save({title: "Remera Boca", price: 300, thumbnail: "https://i.pinimg.com/originals/ea/a5/b8/eaa5b8417e9e95389c1680098cad1348.jpg"})
    await usuario2.getById()
    usuario2.getAll()
    await usuario2.deleteById()
    await usuario2.deleteAll()
}

runProgram()