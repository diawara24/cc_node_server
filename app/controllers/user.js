const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('../utils/crypto.js')


const SECRET_KEY = process.env.SECRET_KEY


exports.signup = async (req, res) => {
    try {
        const value = {
            ...req.body
        };
        value.email = await encrypt(value.email);
        const currentUser = await User.findOne({
            where: { email: value.email }
        })
        if (currentUser) {
            res.status(409).json('user already exist: please login or change your email address !');
            return;
        }
        value.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(value);
        user.email = await decrypt(user.email);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.login = async (req, res) => {
    try {
        const emailEncrypted = await encrypt(req.body.email);
        const user = await User.findOne({
            where: { email: emailEncrypted },
        });
        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const token = await jwt.sign({ id: user.id }, SECRET_KEY);

            user.email = await decrypt(user.email);

            res.status(200).json({
                accessToken: token,
                user: user,
            });
        } else {
            throw new Error("Invalid password");
        }
    } catch (err) {
        res.status(500).json({
            error:
                err.message ||
                `Some error occurred while retrieving user with email "${req.body.email}"`,
        });
    }
}
