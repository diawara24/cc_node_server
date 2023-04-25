const express = require('express');
const router = express();
const woodCtrl = require('../controllers/wood.js');

router.get('/types', woodCtrl.getWoodTypes);

router.get('/:hardness', woodCtrl.findByHardness);


router.get('/all', woodCtrl.getWoods);

router.get('/:id', woodCtrl.getWood);

router.post('/', woodCtrl.addWood);

router.put('/:id', woodCtrl.updateWood);

router.delete('/:id', woodCtrl.deleteWood);

module.exports = router;