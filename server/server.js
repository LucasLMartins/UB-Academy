// Config básica
const express = require('express')
var cors = require('cors')
const app = express()
var path = require('path')
const database = require('./models/db'); 
const fileUpload = require('express-fileupload')
app.use(express.json())
app.use(cors())


// Configurando arquivos estáticos para acessar no front-end
app.use(express.static('public'))
app.use('/images', express.static('images'))


// Porta a ser usada
const port = 5000


// setando o fileUpload
app.use(
    fileUpload({
        useTempFiles: true,
        safeFileNames: true,
        preserveExtension: true,
        tempFileDir: `${__dirname}/public/temp`
    })
);


// Rotas para upload de arquivos
app.post('/admin/videoUpload', (req, res) => {
    const newpath = __dirname + "/public/videos/"
    const file = req.files.file
    const filename = file.name;

    file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
            res.status(500).send({message: "File upload failed", code: 200})
        }
        res.status(200).send({ message: "file uploaded", code: 200})
    })
})

app.post('/admin/imageUpload', (req, res) => {
    const newpath = __dirname + "/public/images/"
    const file = req.files.file
    const filename = file.name;

    file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
            res.status(500).send({message: "File upload failed", code: 200})
        }
        res.status(200).send({ message: "file uploaded", code: 200})
    })
})


// Rota para verificar o login do admin
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

// Rota para passar todas as infos para o admin
app.get('/admin', function(req,res){
    db.query(`SELECT * FROM ubacademy.cursos`, function(erro, resultadoCursos){
        if(erro){
            throw erro;
        }
        db.query(`SELECT * FROM ubacademy.vendas`, function(erro,resultadoVendas){
            if(erro){
                throw erro;
            }
            db.query(`SELECT * FROM ubacademy.aulas`, function(erro, resultadoAulas){
                if(erro){
                    throw erro;
                }
                res.json([{
                    cursos: resultadoCursos,
                    vendas: resultadoVendas,
                    aulas: resultadoAulas
                }])
            }) 
        })
    })
})

// Rota para inserir curso no banco de dados
app.post('/admin/insertCourse', (req,res) => {
    db.query(`INSERT INTO ubacademy.cursos(nomeCurso, categoria, precoCurso, descricaoCurso, imagemCurso, skillsCurso) VALUES (?,?,?,?,?,?)`,
    [req.body.nome, req.body.categoria, req.body.preco, req.body.descricao, req.body.img, req.body.skills], (erro) => {
        if(erro){
            res.status(200).send('Erro: ' + erro)
        }
    })
})

// Rota para editar curso no banco de dados
app.post('/admin/editCourse', (req,res) => {
    db.query(`UPDATE ubacademy.cursos SET nomeCurso = ?, categoria = ?, precoCurso = ?, descricaoCurso = ?, imagemCurso = ?, skillsCurso = ? WHERE idCurso = "?" `,
    [req.body.nome, req.body.categoria, req.body.preco, req.body.descricao, req.body.img, req.body.skills, req.body.id], (erro) => {
        if(erro){
            res.status(200).send('Erro: ' + erro)
        }
    })
})

app.post('/admin/deleteCourse', (req,res) => {
    db.query(`DELETE FROM ubacademy.cursos WHERE idCurso = ?`, [req.body.id], (erro) => {
        if(erro){
            res.status(200).send('Erro: ' + erro)
        }
    })
})

//  Rota para passar as infos da tela "cursos"
app.get('/cursos', (req,res) => {
    db.query('SELECT * FROM ubacademy.cursos', (erro, resultadoCursos) => {
        if(erro){
            throw erro;
        }
        res.json([{
            cursos: resultadoCursos
        }])
    })
})

// Rota para pegar o curso selecionado pela rota
app.post('/curso', (req,res) => {
    db.query(`SELECT * FROM ubacademy.cursos WHERE idCurso = ?`, 
    [req.body.idCurso], (erro, resultadoCurso) => {
        if(erro){
            throw erro;
        }
        res.json([{
            curso: resultadoCurso
        }])
    })
})

app.post('/aula', (req,res) => {
    db.query('SELECT * FROM ubacademy.aulas WHERE idCurso = ?',
    [req.body.idCurso], (erro, resultadoAulas) => {
        if(erro){
            throw erro;
        }
        db.query('SELECT * FROM ubacademy.cursos WHERE idCurso = ?',
        [req.body.idCurso], (erro, resultadoCurso) => {
            if(erro){
                throw erro;
            }
            db.query('SELECT * FROM ubacademy.aulas WHERE idCurso = ? AND idAula = ?',
            [req.body.idCurso, req.body.idAula], (erro, resultadoAula) => {
                if(erro){
                    throw erro;
                }
                res.json([{
                    aulas: resultadoAulas,
                    aula: resultadoAula,
                    curso: resultadoCurso
                }])
            })
        })
    })
})



app.get('/aula', function(req,res){
    db.query(`SELECT * FROM ubacademy.aulas`, function(erro, resultadoAula){
        if(erro){
            throw erro;
        }
        // db.query(`SELECT p.idPedido, p.cpfCliente, i.nomeItem as 'nomeItem', p.idProduto, p.quantidadeProduto, DATE_FORMAT(p.dataPedido, '%d-%m-%Y') as 'data' FROM petshop.pedidos p INNER JOIN petshop.itens i ON p.idProduto = i.idItem`, function(erro,resultadoVendas){
        //     if(erro){
        //         throw erro;
        //     }
            res.json([{
                aula: resultadoAula,
                //vendas: resultadoVendas
            }])
        //})
    })
})






// rodar o server na porta escolhida (deixar abaixo de tudo)
app.listen(port, () => {
    console.log('rodando na porta 5000')
})