const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY

exports.signup = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    }      
}

exports.login = async (req, res) => {
    try {
        
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user) {
            const isLoggedIn = await bcrypt.compare(req.body.password, user.password);
            if (isLoggedIn) {
                const token =  jwt.sign(
                    {
                        id:  user.id,
                        email: user.email
                    }, 
                    SECRET_KEY
                );
                res.status(200).json(token); 
            }else {
                return res.status(403).json('bad credentials');
            }
        }else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        res.status(400).json(error); 
    }
   
}
