const { Wood, Type, Hardness } = require('../models');
const fs = require('fs');


exports.readAll = async (req, res) => {
    try {
        const woodtypes = await Wood.findAll({
            attributes: { exclude: ['typeId', 'hardnessId'] },
            include: [
                {
                    model: Type,
                    as: 'type',
                    attributes: ['id', 'name']
                },
                {
                    model: Hardness,
                    as: 'hardness',
                    attributes: ['id', 'name']
                }
            ]
        });
        res.status(200).json(woodtypes,
            [
                { rel: "self", method: "GET", href: 'http://localhost:3000/api/wood/all' },
                { rel: "create", method: "POST", title: 'Create Wood', href: 'http://localhost:3000/api/wood/' }
            ]
        );
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.findByHardness = async (req, res) => {
    try {
        const hardnessName = req.query.hardness;
        const hardness = await Hardness.findOne({
            where: { name: hardnessName }
        });

        const woods = await Wood.findAll({
            where: { hardnessId: hardness.id },
            attributes: { exclude: ['typeId', 'hardnessId'] },
            include: [
                {
                    model: Type,
                    as: 'type',
                    attributes: ['id', 'name']
                },
                {
                    model: Hardness,
                    as: 'hardness',
                    attributes: ['id', 'name']
                }
            ]
        });
        res.status(200).json(woods);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.findById = async (req, res) => {
    try {
        const wood = await Wood.findOne({
            where: { id: req.params.id },
            attributes: { exclude: ['typeId', 'hardnessId'] },
            include: [
                {
                    model: Type,
                    as: 'type',
                    attributes: ['id', 'name']
                },
                {
                    model: Hardness,
                    as: 'hardness',
                    attributes: ['id', 'name']
                }
            ]
        });
        if (wood) {
            res.status(200).json(wood);
        } else {
            res.status(404).json('wood_not_found');
        }
    } catch (error) {
        res.status(500).json(error);
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
        res.status(500).json(error);
    }
}

exports.update = async (req, res) => {
    try {
        const idWood = req.params.id;
        if (idWood) {
            const value = {
                ...JSON.parse(req.body.datas),
            };
            const wood = await Wood.findOne({
                where: { id: idWood }
            })
            if (req.file) {
                if (wood.image) {
                    deleteImage(wood.image);
                }
                const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
                value.image = pathname;
            } else {
                value.image = wood.image;
            }
            await wood.update(value, {
                where: {
                    id: idWood
                }
            });
            res.status(201).json(wood);
        } else {
            res.status(400).json('send wood id by url');
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.delete = async (req, res) => {
    try {
        const idWood = req.params.id;
        if (idWood) {
            const wood = await Wood.findOne({
                where: { id: idWood }
            })
            if (wood.image) {
                deleteImage(wood.image);
            }
            await wood.destroy({
                where: {
                    id: idWood
                }
            });
            res.status(200).json(`wood deleted`);
        } else {
            res.status(404).json('send wood id by url');
        }
    } catch (error) {
        res.status(500).json(error);
    }

}

function deleteImage(value) {
    if (value) {
        const imagePath = `uploads/${value.split("/").pop()}`;
        fs.unlink(imagePath, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Image deleted:", imagePath);
            }
        });
    }
}