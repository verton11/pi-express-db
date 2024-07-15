const e = require('express');
const db = require('../../config/config_dbinclusimap');
const router = require('express').Router();


/* GET users listing. */
// router.get('/', async function (_req, res, next) {

//     const query = 'SELECT * FROM ';

//     try {
//         const data = await db.any(query);
//         res.status(200).json(data);
//         // res.status(200).json('oi');
//     } catch (error) {
//         res.status(400).json({ msg: error.messager });
//     };
// });

router.get('/:fk_horario', async function (req, res, next) {
    const id_horario = req.params.fk_horario
    const query = `SELECT *
        FROM tutores
        WHERE id_horario= $1`;
    try {
        const data = await db.one(query,id_horario);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.massager })
    }
});

// router.post('/', async function (req, res, next) {
//     const nome = req.body.nome
//     const matricula = req.body.matricula
//     const email = req.body.email
//     const data_nascimento = req.body.data_nascimento

//     const query = `
//     INSERT INTO alunos (matricula, nome, email, data_nascimento)
//     VALUES ($1, $2, $3, $4) `;

//     const values = [matricula, nome, email, data_nascimento]

//     try {
//         const data = await db.any(query, values)
//         res.status(201).json(data)
//     } catch (error) {
//         res.status(400).json( error );
//     }
// });

// router.put('/:matricula', async function (req, res, next) {

//     const matricula = req.params.matricula

//     const nome = req.body.nome
//     const email = req.body.email
//     const data_nascimento = req.body.data_nascimento

//     const query = `
//     UPDATE alunos
//     SET nome = $2, email = $3, data_nascimento = $4
//     WHERE matricula = $1`

//     const values = [matricula, nome, email, data_nascimento]

//     try {
//         const data = await db.none(query, values)
//         res.status(201).json(data)
//     } catch (error) {
//         res.status(400).json(erro);
//     }
// });

// router.delete('/:matricula', async function (req, res, next) {
//     const matricula = req.params.matricula;

//     const require = `DELETE FROM alunos WHERE matricula = $1`

//     const args = matricula

//     try {
        
//         const data = await db.any(require, args,msg);
//         const msg = 'Aluno removido com sucesso!'
        
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(400).json(error)
//     }
// });



module.exports = router;
