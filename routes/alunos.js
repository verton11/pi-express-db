const{localApi} = require('../config/config_axios')
const express = require('express');
const router = express.Router();

var alunos = require('../tests/mock/alunos.json');

/* GET users listing. */
router.get('/', async function (_req, res, next) {
    try {
        const response = await localApi.get('/api/v1/alunos')
        console.log(response)
        const alunos = response.data.content
        // const {data: alunos} = await localApi.get('/api/v1/alunos')
        const data = {title: 'Alunos', alunos};

        res.status(200).render('list', data);
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.get('/new', function (_req, res, next) {
    const {heads: labels} = alunos;
    const parametro = "create";
    const data = {metodo: "POST", parametro, title: "Novo aluno", buttonText: "Adicionar alunos"};

    res.render('form',data);
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
    const aluno = alunos.content[matricula]

    res.render('card',{title: 'Detalhe dos alunos', aluno})
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
    res.render("form",data);
});
router.put('/matricula', function (req, res, next) {

    const {body, method} = req

    res.send({body, method, msg:'alterraçao de usario'});
});

router.delete('/:matricula', function (req, res, next) {
    
    const {matricula} = req.params

    delete alunos.content[matricula]

    res.redirect(303, '/alunos');
});



module.exports = router;
