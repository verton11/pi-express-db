const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    const data = {
        title: 'sobre',
    }
    res.render('sobre',data);
});

module.exports = router;