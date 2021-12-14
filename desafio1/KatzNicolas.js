class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascotas = mascotas
    }   

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota){
        this.mascotas.push(mascota)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor})
    }

    getBookNames(){
        return this.libros.map(libro=>libro.nombre)
    }    
}

const usuario = new Usuario("Nicolas", "Katz", [{nombre: "El Alquimista", autor: "Paulo Coelho"}], ["Perro1", "Perro2", "Perro3"])

usuario.getFullName()
usuario.addMascota("Perro4")
usuario.countMascotas()
usuario.addBook("Padre Rico, Padre Pobre", "Robert Kiyosaki")
usuario.getBookNames()