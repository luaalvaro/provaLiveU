const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use('/public', express.static(__dirname + '/public'))

app.use('/', require(__dirname + '/server/routes/router'))

app.listen(3000, () => console.log("Servidor iniciado e rodando em http://localhost:3000"))
