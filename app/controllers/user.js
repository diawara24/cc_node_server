const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        const user = await User.create(req.body);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
        
}

exports.login = (req, res) => {
    res.send('You are loged in');
}