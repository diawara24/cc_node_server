const { json } = require('sequelize');
const { Wood, Type, Hardness } = require('../models');


exports.readAll = async (req, res) => {
    try {
        const woodtypes = await Wood.findAll({
            attributes: { exclude: ['typeId', 'hardnessId'] },
            include: [
                {
                    model: Type,
                    as: 'type'
                },
                {
                    model: Hardness,
                    as: 'hardness'
                }
            ]
        });
        res.status(200).json(woodtypes,
            [
                { rel: "self", method: "GET", href: 'http://localhost:3000/api/wood/all' },
                { rel: "create", method: "POST", title: 'Create Person', href: 'http://localhost:3000/api/wood/' }
            ]
        );
    } catch (error) {
        res.status(400).json(error);
    }
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

exports.create = async (req, res) => {
    try {
        const value = {
            ...JSON.parse(req.body.datas),
        };

        if (req.file) {
            const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
            value.image = pathname;
        }

        const wood = await Wood.create(value);
        res.status(201).json(wood);

    } catch (error) {
        res.status(400).json(error);
    }
}

exports.update = (req, res) => {
    res.status(200).json(`update wood id=${req.params.id}`);
}

exports.delete = (req, res) => {
    res.status(200).json(`delete wood id=${req.params.id}`);
}