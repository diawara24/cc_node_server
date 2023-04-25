const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }      
}

exports.login = (req, res) => {
    res.status(200).json('You are loged in');
}
