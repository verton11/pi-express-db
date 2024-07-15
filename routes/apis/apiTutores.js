const e = require('express');
const db = require('../../config/config_database');
const router = require('express').Router();

/* GET users listing. */
router.get('/', async function (_req, res, next) {

    const query = 'SELECT * FROM tutores';

    try {
        const data = await db.any(query);
        res.status(200).json(data);
        // res.status(200).json('oi');
    } catch (error) {
        res.status(400).json({ msg: error.messager });
    };
});

router.get('/:id_tutor', async function (req, res, next) {
    const tutor = req.params.id_tutor
    const query = `SELECT *
        FROM tutores
        WHERE id_tutor = $1`;
    try {
        const data = await db.one(query,tutor);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.massager })
    }
});

router.post('/', async function (req, res, next) {
    const id = req.body.id_tutor
    const cpf = req.body.cpf_tutor
    const nome = req.body.nome_tutor
    const email = req.body.email_tutor
    const telefone = req.body.telefone_tutor
    const cargo = req.body.cargo
    const formacao = req.body.formacao

    const query = `
    INSERT INTO tutores (id_tutor, cpf_tutor, nome_tutor, email_tutor, telefone_tutor, cargo, formacao)
    VALUES ($1, $2, $3, $4, $5, $6, $7) `;

    const values = [id, cpf, nome, email, telefone, cargo, formacao]

    try {
        const data = await db.any(query, values)
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json( error );
    }
});

router.put('/:id_tutor', async function (req, res, next) {
    const id = req.body.id_tutor
    const cpf = req.body.cpf_tutor
    const nome = req.body.nome_tutor
    const email = req.body.email_tutor
    const telefone = req.body.telefone_tutor
    const cargo = req.body.cargo
    const formacao = req.body.formacao

    const query = `
    UPDATE tutores
    SET cpf_tutor = $2, nome_tutor = $3, email_tutor = $4, telefone_tutor = $5, cargo =$6, formacao = $7
    WHERE id_tutor = $1`

    const values = [id, cpf, nome, email, telefone, cargo, formacao]

    try {
        const data = await db.none(query, values)
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json(erro);
    }
});

router.delete('/:id', async function (req, res, next) {
    const id = req.params.id;

    const require = `DELETE FROM tutores
                    WHERE   id_tutor = $1`

    const args = id

    try {
        
        const data = await db.any(require, args);
        
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error)
    }
});



module.exports = router;
