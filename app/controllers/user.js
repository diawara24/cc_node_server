const { User } = require('../models');

exports.signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.send(user);
    } catch (error) {
        res.send(error);
    }
        
}

exports.login = (req, res) => {
    res.send('You are loged in');
}