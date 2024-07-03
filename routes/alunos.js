const express = require('express');
const router = express.Router();

var alunos = require('../tests/mock/alunos.json');

/* GET users listing. */
router.get('/', function(_req, res, next) {
    const data = {
        title: 'Alunos', 
        alunos: alunos.content
    }
    res.render('list',data);
});

router.get('/new', function(req, res, next) {
  res.render('form', {title: 'Novo aluno', buttonText: 'Adiciona'});
});

router.get('/:matricula', function(req, res, next) {
    const {matricula} =  req.params;

    const aluno = alunos.content[matricula];

    res.render('card',{title:'Detalhe dos alunos', aluno})
});

module.exports = router;
