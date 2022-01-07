import { select, insert } from './dataFromSQL.js'

class DB {
    constructor(){}

    async saveData(data) {
        await insert(data)
    }
    
    async getData() {
        const GET_DATA = await select()
        return GET_DATA
    }
}

export default DB