const bodyParser = (request) => {
   return new Promise((resolve, reject) => {
    let total_data = ''
    request
        .on('data', (chunk) => { //escuchar datos y recolectar
            total_data += chunk
        })
        .on('end', () => {//acaba promesa
            request.dataBody = JSON.parse(total_data)
            resolve()
        })
        .on('error', (err) => {//clausula de error
            console.log(err)
            reject()
        })
   })
}

module.exports = { bodyParser }