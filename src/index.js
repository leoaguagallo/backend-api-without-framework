/*
* servidor
*/
const http = require('http')

/*
* Settings
*/
const PORT = 5000
var database = []

const get_usersHandler = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(database)) //coversio de str a json
    res.end()
}

const create_userHandler = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write('post received') //coversio de str a json
    res.end()
}

/*
* Handled: manejador de peticiors
*/
const server = http.createServer((req, res) => {
    const { url, method } = req

    console.log(`URL: ${url} - Method: ${method}`)



    switch (method) {
        case "GET":
            if (url === "/") {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.write(JSON.stringify({ message: 'Home Page' })) //coversio de str a json
                res.end()
            }
            if (url === "/users") {
                get_usersHandler(req, res)
            }
            break;

        case "POST":
            if (url === "/users") {
                create_userHandler(req, res)
            }
            break;

        default:
            break;
    }

})

server.listen(PORT)
console.log('Server run on http://localhost:' + PORT)