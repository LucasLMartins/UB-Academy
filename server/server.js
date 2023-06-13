// Config básica
const express = require('express')
var cors = require('cors')
const app = express()
var path = require('path')
const database = require('./models/db'); 
const fileUpload = require('express-fileupload')
app.use(express.json())
app.use(cors())
const fs = require('fs');
const jwt = require('jsonwebtoken')


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

app.post('/admin/deleteVideo', (req,res) => {
    const newpath = __dirname + "/public/videos/"
    const filename = req.body.fileName

    fs.unlink(`${newpath}${filename}`, (err) => {
        if (err) {
            res.status(500).send({message: "File delete failed", code: 200})
        }
        res.status(200).send({ message: "file deleted", code: 200})
    }); 
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

app.post('/admin/deleteImage', (req,res) => {
    const newpath = __dirname + "/public/images/"
    const filename = req.body.fileName

    fs.unlink(`${newpath}${filename}`, (err) => {
        if (err) {
            res.status(500).send({message: "File delete failed", code: 200})
        }
        res.status(200).send({ message: "file deleted", code: 200})
    })
})


//Rota para cadastrar usuário
app.post("/registerUser", (req,res) => {
    db.query(`INSERT INTO ubacademy.usuarios(nomeUsuario, emailUsuario, password) VALUES (?,?,?)`,
    [req.body.nomeUsuario, req.body.emailUsuario, req.body.password], (erro) => {
        if(erro){
            res.json([{
                erro: erro,
                msg: false
            }])
        } else {
            res.json([{
                msg: true
            }])
        }
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

app.post("/loginUser", (req,res) => {
    db.query(`SELECT * FROM ubacademy.usuarios WHERE emailUsuario = ? AND password = ?`,
    [req.body.email, req.body.password], (erro, resultado) => {
        if(erro){
            res.status(200).send('Erro: ' + erro)
        } else {
            if(resultado.length > 0){
                res.json([{
                    user: resultado[0],
                    resultado: true,
                    token: jwt.sign({id: resultado[0].idUsuario}, "D9J37F1LF6AB00V91M2VCZ8DHD003LAS01854BCUJ3009VKSH", {expiresIn: '5d'})
                }])
            } else {
                res.json([{
                    resultado: false
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

// Rota para deletar curso no banco de dados
app.post('/admin/deleteCourse', (req,res) => {
    db.query(`DELETE FROM ubacademy.cursos WHERE idCurso = ?`, [req.body.id], (erro) => {
        if(erro){
            res.status(200).send('Erro: ' + erro)
        }
    })
})

// Rota para inserir aula no banco de dados
app.post('/admin/insertLesson', (req,res) => {
    db.query(`INSERT INTO ubacademy.aulas(idCurso, tituloAula, video, descricaoAula) VALUES (?,?,?,?)`,
    [req.body.idCurso, req.body.titulo, req.body.video, req.body.descricao], (erro) => {
        if(erro){
            res.status(200).send('Erro: ' + erro)
        }
    })
})

// Rota para editar aula no banco de dados
app.post('/admin/editLesson', (req,res) => {
    db.query(`UPDATE ubacademy.aulas SET tituloAula = ?, video = ?, descricaoAula = ? WHERE idCurso = ? AND idAula = ?`,
    [req.body.titulo, req.body.video, req.body.descricao, req.body.idCurso, req.body.idAula], (erro) => {
        if(erro){
            res.status(200).send('Erro: ' + erro)
        }
    })
})

// Rota para deletar aula no banco de dados
app.post('/admin/deleteLesson', (req,res) => {
    db.query(`DELETE FROM ubacademy.aulas WHERE idAula = ?`, [req.body.id], (erro) => {
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
    db.query(`SELECT C.idCurso, C.nomeCurso, C.categoria, C.precoCurso, C.descricaoCurso, C.imagemCurso, COUNT(A.idAula) AS qnt FROM ubacademy.cursos AS C INNER JOIN ubacademy.aulas AS A ON C.idCurso = A.idCurso WHERE C.idCurso = ?;
    `, 
    [req.body.idCurso], (erro, resultadoCurso) => {
        if(erro){
            throw erro;
        }
        db.query(`SELECT * FROM ubacademy.aulas WHERE idCurso = ?`,
        [req.body.idCurso], (erro, resultadoAulas) => {
            if(erro){
                throw erro;
            }
            res.json([{
                curso: resultadoCurso,
                aulas: resultadoAulas
            }])
        })
    })
})

app.post('/authAula', (req,res) => {
    db.query(`SELECT C.idCurso, C.nomeCurso, C.imagemCurso, A.idAula FROM ubacademy.cursos AS C INNER JOIN ubacademy.aulas AS A ON C.idCurso = A.idCurso INNER JOIN ubacademy.usuario_curso AS UC ON C.idCurso = UC.idCurso INNER JOIN ubacademy.usuarios AS U ON UC.idUsuario = U.idUsuario WHERE U.idUsuario = ? AND C.idCurso = ? GROUP BY C.idCurso`,
    [req.body.idUsuario, req.body.idCurso], (erro, resultado) => {
        if(erro){
            res.status(200).send('Erro: ' + erro)
        } else {
            if (resultado.length > 0){
                res.json([{
                    resultado: true
                }])
            } else {
                res.json([{
                    resultado: false
                }])
            }
            
        }
        
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

app.post('/perfil', (req,res) => {
    db.query('SELECT C.idCurso, C.nomeCurso, C.imagemCurso, A.idAula FROM ubacademy.cursos AS C INNER JOIN ubacademy.aulas AS A ON C.idCurso = A.idCurso INNER JOIN ubacademy.usuario_curso AS UC ON C.idCurso = UC.idCurso INNER JOIN ubacademy.usuarios AS U ON UC.idUsuario = U.idUsuario WHERE U.idUsuario = ? GROUP BY C.idCurso',
    [req.body.idUsuario], (erro, resultado) => {
        if(erro){
            res.status(200).send('Erro: ' + erro)
        }
        res.json([{
            resultado: resultado
        }])
    })
})





// rodar o server na porta escolhida (deixar abaixo de tudo)
app.listen(port, () => {
    console.log('rodando na porta 5000')
})