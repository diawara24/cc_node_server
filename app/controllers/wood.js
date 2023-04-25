const { Wood } = require('../models')

exports.getWoodTypes = async (req, res) => {
    const woodtypes = await Wood.findAll({
        attributes: ['type']
    });
    res.status(200).json(woodtypes);
}

exports.findByHardness = async (req, res) => {
    try {
        const woods = await Wood.findAll({
            where: { hardness: req.params.hardness }
        });
        res.status(200).json(woods);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getWoods = (req, res) => {
    res.status(200).json('List of wood');
}

exports.getWood = (req, res) => {
    res.status(200).json(`get wood id=${req.params.id}`);
}


exports.addWood = (req, res) => {
    res.status(200).json('add wood');
}

exports.updateWood = (req, res) => {
    res.status(200).json(`update wood id=${req.params.id}`);
}

exports.deleteWood = (req, res) => {
    res.status(200).json(`delete wood id=${req.params.id}`);
}