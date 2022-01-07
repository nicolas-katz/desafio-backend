const SOCKET = io()

const CHAT = document.querySelector('#chat')

SOCKET.on('products', (data) => {
    let PRODUCTS = [] //
    CHAT.innerHTML = ""
    fetch('http://localhost:3000/test')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(e => {
                CHAT.append(`
                    <strong>${e.id}</strong>
                    <em>${e.title}</em>
                    <em>${e.price}</em>
                    <em>${e.thumbnail}</em>
                `)
            })
        })
})