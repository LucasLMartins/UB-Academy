// Config básica
const express = require('express')
var cors = require('cors')
const app = express()
var path = require('path')

// Porta a ser usada
const port = 5000


app.use(express.json())

app.use(cors())

// Passando parâmetros para o front-end através das rotas
app.get('/home', (req,res) => {
    res.json([{
        teste: 'parametro teste'
    }])
})




// rodar o server na porta escolhida (deixar abaixo de tudo)
app.listen(port, () => {
    console.log('rodando na porta 5000')
})