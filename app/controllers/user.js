const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {encrypt, decrypt} = require('../utils/crypto.js')


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
        const email = await encrypt(req.body.email);
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            const isLoggedIn = await bcrypt.compare(req.body.password, user.password);
            if (isLoggedIn) {
                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email
                    },
                    SECRET_KEY
                );
                user.email = await decrypt(user.email);
                console.log(user.email, await decrypt(user.email));
                res.status(200).json({
                    user: user,
                    token: token
                });
            } else {
                return res.status(403).json('bad credentials');
            }
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        res.status(500).json(error);
    }

}
