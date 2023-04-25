const UserModel = require("../Model/user.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
        let user = await UserModel.find({ email: req.body.email })
        if (user.length)
            return res.status(403).json({ message: 'User Already Registered!' });

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err)
                return res.status(403).json({ message: 'Something went wrong while hashing password!', err });

            req.body.password = hash;
            await new UserModel(req.body).save();
            res.status(201).json({ msg: 'User Registered Successfully🎉' });
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while registering user!' });
        console.log(error)
    }
}
exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
    
        let user = await UserModel.find({ email });
        console.log(user)
        if (!user.length)
            return res.status(404).json({ message: 'User Not Found!' });

        bcrypt.compare(password, user[0].password, async (err, result) => {
            if (err)
                return res.status(403).json({message: 'Something went wrong while checking password!'});

            if (result) {
                let token = jwt.sign({ userId: user[0]._id }, JWT_SECRET)
                res.status(201).json({ msg: 'Login Successfully🎉', token })
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while login user!'});
        console.log(error)
    }
}
