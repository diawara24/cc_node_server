const { Wood } = require('../models')

exports.readAll = async (req, res) => {
    const woodtypes = await Wood.findAll();
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

exports.findById = async (req, res) => {
    try {
        const wood = await Wood.findOne({
            where: { id: req.params.id }
        });
        console.log(req.params.id);
        res.status(200).json(wood);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.create = (req, res) => {
    res.status(200).json('add wood');
}

exports.update = (req, res) => {
    res.status(200).json(`update wood id=${req.params.id}`);
}

exports.delete = (req, res) => {
    res.status(200).json(`delete wood id=${req.params.id}`);
}