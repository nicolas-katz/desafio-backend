import { promises } from 'fs';
const { readFile, writeFile } = promises;
import { name as _name, commerce } from 'faker';
import { normalize, schema } from 'normalizr';

const _get = (req, res) => {
    let productos = []
    for (let index = 0; index < 3; index++) {
        const producto = {
            name: _name.firstName(),
            price: commerce.price()
        }
        productos.push(producto)
    }
    res.json(productos)
}

const _getAll = async (req, res) => {
    try {
        const readed = await readFile('msgs.json', 'utf-8')
        const all = JSON.parse(readed)
        return res.json(all)
    } catch (e) {
        console.log(e)
        res.send("Hubo un error en la lectura de mensajes")
    }
}

const _new = async (req, res) => {
    try {
        const completeMessage = req.body
        const allReaded = await readFile('msgs.json', 'utf-8')
        const allMessages = JSON.parse(allReaded)
        allMessages.push(completeMessage)
        const messagesWritten = await writeFile('msgs.json', JSON.stringify(allMessages, null, 2))
        const sendToFront = allMessages.map(m => {
            return {
                author: m.author.nombre,
                msg: m.text
            }
        })
        return res.json(sendToFront)
    } catch (e) {
        console.log(e)
        res.send("Hubo un error enviando el mensaje")
    }
}

const _msgNormalized = async (req, res) => {
    try {
        const author = new schema.Entity('author')
        const msg = new schema.Entity('msg', {author: authorSchema})
        const msgs = await readFile('messages.json', 'utf-8')
        const json = JSON.parse(msgs)
        const normalizedMsgs = normalize(json, [msg])
        return res.json(normalizedMsgs)
    } catch (e) {
        console.log(e)
        return res.send("Hubo un error trayendo los mensajes normalizados")
    }
}

export default { _get, _new, _getAll, _msgNormalized }