const{localApi} = require('../../config/config_axios')
const express = require('express');
const router = express.Router();
const path = require('path');
const { title } = require('process');

/* GET users listing. */
router.get('/', async function (_req, res, next) {
    try {
        const response = await localApi.get('/api/v1/tutores')
        // console.log(response)
        const tutores = response.data;
        const viewData = {title: 'tutores', tutores};

        res.status(200).render('list', viewData);
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.get('/new', function (_req, res, next) {
    const viewData = {
        metodo: "POST", 
        parametro: "create", 
        title: "Novo tutor", 
        buttonText: "Adicionar tutores"};

    res.render('form',viewData);
});

router.post('/create', async function(req, res, next){
    let apiUrlaPath = '/api/v1/tutores/';
    let data = req.body

    try {
        await localApi.post(apiUrlaPath, data)
    } catch (error) {
        console.error(error.message)
        
    } finally{
        res.redirect('/tutores')
    }
});

router.get('/:id_tutor', async function (req, res, next) {
    const id_tutor  = req.params.id_tutor;
    
    try {
        let response = await localApi.get('/api/v1/tutores/' + id_tutor)
        let aluno = response.data
        let viewData = {aluno, title: 'Detalhes do tutor'}

        res.status(200).render('card', viewData)
    } catch (error) {
        res.json({msg: error.message})
    }
});

router.get('/edit/:id_tutor', async function (req, res, next) {
    const id_tutor  = req.params.id_tutor;
    let apiUrlaPath = '/api/v1/tutores/' + id_tutor

    const viewData = {
        metodo: "PUT", 
        parametro: id_tutor, 
        title: "Editar tutor", 
        buttonText: "Atualizar tutor"};

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

router.put('/id_tutor', async function (req, res, next) {
    const id_tutor  = req.params.id_tutor;
    let apiUrlaPath = '/api/v1/tutores/' + id_tutor

    const data = req.body

    try {
        await localApi.put(apiUrlaPath, data)
        res.redirect('/tutores/' + id_tutor)
    } catch (error) {
        console.error(error.message)
        res.redirect('/tutores/' + id_tutor)
    }
});

router.delete('/:id_tutor', async function (req, res, next) {
    const id_tutor  = req.params.id_tutor;
    
    try {
        await localApi.delete('/api/v1/tutores/' + id_tutor)
    } catch (error) {
        res.json({msg: error.message})
    }
    finally{
        res.redirect(303, '/tutores')
    }
});



module.exports = router;
