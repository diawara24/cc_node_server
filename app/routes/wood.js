const express = require('express');
const router = express();
const woodCtrl = require('../controllers/wood.js');
const auth = require("../middleware/auth.js");
const multer = require('../middleware/multer.js');

router.get('/all', auth, woodCtrl.readAll);

router.get('/:hardness', auth, woodCtrl.findByHardness);

router.post("/", auth, multer, woodCtrl.create);


module.exports = router;