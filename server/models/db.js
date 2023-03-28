//Requerindo o Sequelize
const mysql = require('mysql')

//Conectando ao mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "petshop",
    define: {
        "timestamps": false
    }
})

connection.connect(function(erro){
    if (erro){
        console.log('ERRO ABAIXO:')
        console.log(erro)
        console.log('Falha ao se conectar ao MySQL')
    }
    if (!erro){
        console.log('Conectado ao MySQL com sucesso')
    }
})

global.db = connection;

//Exportando o modulo
module.exports = {
    connection,
}