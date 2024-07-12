const{localApi} = require('../../config/config_axios')
const express = require('express');
const router = express.Router();
const path = require('path');
const { title } = require('process');

/* GET users listing. */
router.get('/', async function (_req, res, next) {
    try {
        const response = await localApi.get('/api/v1/alunos')
        // console.log(response)
        const alunos = response.data;
        const viewData = {title: 'Alunos', alunos};

        res.status(200).render('list', viewData);
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.get('/new', function (_req, res, next) {
    const viewData = {
        metodo: "POST", 
        parametro: "create", 
        title: "Novo aluno", 
        buttonText: "Adicionar alunos"};

    res.render('form',viewData);
});

router.post('/create', async function(req, res, next){
    let apiUrlaPath = '/api/v1/alunos/';
    let data = req.body

    try {
        await localApi.post(apiUrlaPath, data)
    } catch (error) {
        console.error(error.message)
        
    } finally{
        res.redirect('/alunos')
    }
});

router.get('/:matricula', async function (req, res, next) {
    const matricula  = req.params.matricula;
    
    try {
        let response = await localApi.get('/api/v1/alunos/' + matricula)
        let aluno = response.data
        let viewData = {aluno, title: 'Detalhes do aluno'}

        res.status(200).render('card', viewData)
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.get('/edit/:matricula', async function (req, res, next) {
    const matricula  = req.params.matricula;
    let apiUrlaPath = '/api/v1/alunos/' + matricula

    const viewData = {
        metodo: "PUT", 
        parametro: matricula, 
        title: "Editar aluno", 
        buttonText: "Atualizar alunos"};

    try {
        let response = await localApi.get(apiUrlaPath)
        let aluno = response.data
        console.log(aluno)
        viewData.aluno = aluno;

        res.status(200).render('form', viewData)
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.put('/matricula', async function (req, res, next) {
    const matricula  = req.params.matricula;
    let apiUrlaPath = '/api/v1/alunos/' + matricula

    const data = req.body

    try {
        await localApi.put(apiUrlaPath, data)
        res.redirect('/alunos/' + matricula)
    } catch (error) {
        console.error(error.message)
        res.redirect('/alunos/' + matricula)
    }
});

router.delete('/:matricula', async function (req, res, next) {
    const matricula  = req.params.matricula;
    
    try {
        await localApi.delete('/api/v1/alunos/' + matricula)
    } catch (error) {
        res.json({msg: error.message})
    }
    finally{
        res.redirect(303, '/alunos')
    }
});



module.exports = router;
