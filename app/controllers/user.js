const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

const SECRET_KEY = process.env.SECRET_KEY
const key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
const iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

exports.signup = async (req, res) => {
    try {
        const value = {
            ...req.body
        };
        
        value.email = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();
        value.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(value);
        const bytes  = CryptoJS.AES.decrypt(user.email, key, {iv: iv});
        user.email = bytes.toString(CryptoJS.enc.Utf8);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.login = async (req, res) => {
    try {
        const email = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();
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
