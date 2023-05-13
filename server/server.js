// Config básica
const express = require('express')
var cors = require('cors')
const app = express()
var path = require('path')
const database = require('./models/db'); 

// Porta a ser usada
const port = 5000


app.use(express.json())
app.use(cors())

//------ Passando parâmetros para o front-end através das rotas ------//

// Admin
app.get('/admin', function(req,res){
    db.query(`SELECT * FROM ubacademy.cursos`, function(erro, resultadoCursos){
        if(erro){
            throw erro;
        }
        // db.query(`SELECT p.idPedido, p.cpfCliente, i.nomeItem as 'nomeItem', p.idProduto, p.quantidadeProduto, DATE_FORMAT(p.dataPedido, '%d-%m-%Y') as 'data' FROM petshop.pedidos p INNER JOIN petshop.itens i ON p.idProduto = i.idItem`, function(erro,resultadoVendas){
        //     if(erro){
        //         throw erro;
        //     }
            res.json([{
                cursos: resultadoCursos,
                //vendas: resultadoVendas
            }])
        //})
    })
})

app.post("/admin/loginAdmin", (req,res) => {
    db.query(`SELECT * FROM ubacademy.admin WHERE userAdmin = ? AND senhaAdmin = ?`,
    [req.body.user, req.body.password], (erro, resultado) => {
        if(erro){
            res.status(200).send('Erro: ' + erro)
        }else{
            if(resultado.length > 0){
                res.json([{
                    adminInfo: resultado,
                    resultado: 'true'
                }])
            }else{
                res.json([{
                    resultado: 'false'
                }])
            }
        }
    })
})




// rodar o server na porta escolhida (deixar abaixo de tudo)
app.listen(port, () => {
    console.log('rodando na porta 5000')
})