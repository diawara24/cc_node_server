const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        req.body.password = await hashPassword(req.body.password);
        const user = await User.create(req.body);
        res.status(200);
        res.send(user);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
        
}

exports.login = (req, res) => {
    res.status(200);
    res.send('You are loged in');
}

async function hashPassword(original_password){
    const hashedPass = await bcrypt.hash(original_password, 10);
    return hashedPass; 
}