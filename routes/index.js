var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  const now = new Date()
  const data = {
    title: 'Express',
    name: 'Verton',
    date: [now.getDate(), now.getMonth(), now.getFullYear(), ].join(' \\ '),
    hora: now.getHours() + ':' + now.getMinutes()
  }

  res.render('index', data)
});

module.exports = router;
