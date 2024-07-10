const e = require('express');
const db = require('../../config/config_database');
const router = require('express').Router();

/* GET users listing. */
router.get('/', async function (_req, res, next) {

    const query = 'SELECT * FROM alunos';

    try {
        const data = await db.any(query);
        res.status(200).json(data);
        // res.status(200).json('oi');
    } catch (error) {
        res.status(400).json({ msg: error.messager });
    };
});

router.post('/', async function (req, res, next) {
    const nome = req.body.nome
    const matricula = req.body.matricula
    const email = req.body.email
    const data_nascimento = req.body.data_nascimento

    const query = `
    INSERT INTO alunos (matricula, nome, email, data_nascimento)
    VALUES ($1, $2, $3, $4) `;

    const values = [matricula, nome, email, data_nascimento]

    try {
        const data = await db.any(query, values)
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json( error );
    }
});

router.get('/:matricula', function (req, res, next) {
    const {matricula} = req.params.matricula;
    const query = `
    SELECT * 
    FROM alunos 
    WHERE matricula = $1`;

    try {
        const aluno = alunos.content[matricula]
        res.status(200).json('list', aluno);
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

    // const { matricula } = req.params;
    // const aluno = alunos.content[matricula]

    // res.render('card',{title: 'Detalhe dos alunos', aluno})
});

router.put('/:matricula', function (req, res, next) {

    // const {matricula} = req.params
    // try {
    //     const aluno = alunos.content[matricula]
    //     res.status(200).json('list', aluno);
    // } catch (error) {
    //     res.status(400).json({msg: error.message})
    // }

    const query = `
    UPDATE alunos
    SET nome = $2, email = $3, data_nascimento = $4
    WHERE matricula = $1`

    const novoAluno = req.body;
    const matricula = Number(req.params.matricula);

    alunos.content[matricula] = { ...novoAluno, matricula };

    const response = {
        mas: "aluno criado com sucesso",
        aluno: alunos.content[matricula]
    }

    res.status(200).json(response);
});

router.delete('/:matricula', function (req, res, next) {

    const require = `DELETE FROM alunos WHERE matricula`

    const matricula = req.params.matricula

    delete alunos.content[matricula]

    const response = {
        mas: "aluno removido",
        matricula
    }

    res.status(201).json(response);
});



module.exports = router;
