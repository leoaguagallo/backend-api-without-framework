/*
* servidor
*/
const http = require('http')

/*
* Local imports
*/
const { bodyParser } = require('./lib/body-parser')

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

const create_userHandler = async (req, res) => {
    try {
        await bodyParser(req)
        database.push(req.dataBody)
        console.log(req.dataBody)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(database)) //coversio de req.dataBody a json
        res.end()
    } catch (e) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ message: 'Invalid data' }))
        res.end()
    }
}

const update_userHandler = async (req, res) => {
    try {
        let { url } = req

        let id_query = url.split("?")[1] //id=1
        let id_key = id_query.split("=")[0]
        let id_value = id_query.split("=")[1]

        if (id_key === "id") {
            await bodyParser(req)
            database[id_value - 1] = req.dataBody

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify(database))
            res.end()
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify({ message: 'Invalid Query data' }))
            res.end()
        }
    } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ message: `Invalid body data was provided ${e.message}` }))
        res.end()
    }

}

const delete_userHandler = async (req, res) => {
    try {
        let { url } = req

        let id_query = url.split("?")[1] //id=1
        let id_key = id_query.split("=")[0]
        let id_value = id_query.split("=")[1]

        if (id_key === 'id') {
            database.splice(id_value - 1, 1)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify({ message: `Delete successfully` }))
            res.end()
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify({ message: 'Invalid Query data' }))
            res.end()
        }
    } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ message: `Invalid body data was provided ${e.message}` }))
        res.end()
    }

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

        case "PUT":
            update_userHandler(req, res)
            break;

        case "DELETE":
            delete_userHandler(req, res)
            break;

        default:
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify({ message: `404 NOT FOUND` }))
            res.end()
            break;
    }

})

server.listen(PORT)
console.log('Server run on http://localhost:' + PORT)