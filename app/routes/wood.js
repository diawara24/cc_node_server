const express = require('express');
const router = express();

router.get('/all', function (req, res) {
    res.send('List of wood');
});

router.get('/:id', function (req, res) {
    res.send(`get wood id=${req.params.id}`);
});

router.post('/', function (req, res) {
    res.send('add wood');
});

router.put('/:id', function (req, res) {
    res.send(`update wood id=${req.params.id}`);
});

router.delete('/:id', function (req, res) {
    res.send(`delete wood id=${req.params.id}`);
});

module.exports = router;