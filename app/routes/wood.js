const express = require('express');
const router = express();
const woodCtrl = require('../controllers/wood.js');

router.get('/all', woodCtrl.readAll);

router.get('/:hardness', woodCtrl.findByHardness);


module.exports = router;