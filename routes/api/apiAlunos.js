const express = require('express');
const router = express.Router();

var alunos = require('../../tests/mock/alunos.json');

/* GET users listing. */
router.get('/', function (_req, res, next) {
    const data = {alunos}
    
    res.json(data)
});

router.post('/',function(req, res, next){
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
