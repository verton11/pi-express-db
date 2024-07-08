const express = require('express');
const router = express.Router();

var alunos = require('../tests/mock/alunos.json');

/* GET users listing. */
router.get('/', function (_req, res, next) {
    const data = {
        title: 'Alunos',
        alunos: alunos.content
    }
    res.render('list', data);
});

router.get('/new', function (_req, res, next) {
    const {heads: labels} = alunos;
    const parametro = "create";
    const data = {metodo: "POST", parametro, title: "Novo aluno", buttonText: "Adicionar alunos"};

    res.render('form',data);
});

router.post('/', function (req, res, next) {

    const {body, method} = req

    res.send({body, method});
});

router.post('/create',function(req, res, next){
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;
    
    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula)
    };

    res.redirect(alunos);
});

router.get('/:matricula', function (req, res, next) {
    const { matricula } = req.params;
    const novoAluno = req.body;

    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula)
    };

    res.redirect('/alunos')
});

router.get('/edit/:matricula', function (req, res, next) {
    const { matricula } = req.params;
    const aluno = alunos.content[matricula];
    const data = {
        aluno,
        metado: "PUT",
        parametro: matricula,
        title: 'Editar Aluno',
        buttonText: 'Salva alteraçoes'
    };
    res.render("forms",data);
});

router.post('/create', function (req, res, next) {

    const novoAluno = req.body;
    const matricula = novoAluno.matricula;
    
    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula)
    }
    res.redirect("/alunos");
});

router.put('/matricula', function (req, res, next) {

    const {body, method} = req

    res.send({body, method, msg:'alterraçao de usario'});
});

router.delete('/', function (req, res, next) {
    
    const {body, method} = req

    res.send({body, method, msg:'remover aluno'});
});



module.exports = router;
