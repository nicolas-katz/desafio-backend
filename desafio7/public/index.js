const SOCKET = io()

document.querySelector('#username').innerHTML = `Hello, username`

const chat = document.querySelector('#chat-products')

SOCKET.on('products', (data) => {
    chat.innerHTML = ""
    fetch('http://localhost:3000/fetch')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(product => {
                chat.append(`
                    <strong>${product.id}</strong>
                    <div>
                        <em>${product.title}</em>
                        <em>${product.price}</em>
                        <em>${product.thumbnail}</em>
                    </div>
                `)
            })
        })
})
