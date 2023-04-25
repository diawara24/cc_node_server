const { Wood } = require('../models')

exports.getWoodTypes = async (req, res) => {
    const woodtypes = await Wood.findAll({
        attributes: ['type']
      });
    res.send(woodtypes);
}

exports.findByHardness = async (req, res) => {
    try {
        const woods = await Wood.findAll({
            where: {hardness: req.params.hardness}
        });
        res.send(woods);
    } catch (error) {
        res.send(error);
    }
}

exports.getWoods = (req, res) => {
    res.send('List of wood');
}

exports.getWood = (req, res) => {
    res.send(`get wood id=${req.params.id}`);
}


exports.addWood = (req, res) => {
    res.send('add wood');
}

exports.updateWood = (req, res) => {
    res.send(`update wood id=${req.params.id}`);
}

exports.deleteWood = (req, res) => {
    res.send(`delete wood id=${req.params.id}`);
}