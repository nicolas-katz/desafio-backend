import { readFileSync } from 'fs';

class Products{

    constructor(fillname){
        this.list = []
        this.id = 0
        this.fillname = fillname
        this.init()
    }

    init() {
        let data = readFileSync(this.fillname)
        let listProducts = JSON.parse(data)
        for(const obj of listProducts) {
            this.insert(obj)
        }
    }

    find(id) {
        return this.list.find((obj) => obj.id == id)
    }

    insert(obj) {
        obj.id = ++this.id
        this.list.push(obj)
        return this.list
    }

    update(id, obj) {
        const i = this.list.findIndex((objeto) => objeto.id == id)
        obj.id = this.list[i].id
        this.list[i] = obj
        return obj
    }

    delate(id){
        this.list = this.list.filter(obj => obj.id !== id)
        return this.list
    }

}

export default { Products }