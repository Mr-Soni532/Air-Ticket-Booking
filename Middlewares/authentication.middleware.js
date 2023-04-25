const jwt = require('jsonwebtoken')
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (token) {
            jwt.verify(token, JWT_SECRET, (err, decode) => {
                if (err)
                    return res.status(403).json({ message: 'Invalid Token!', err });
                req.body.userId = decode.userId;
                next()
            })
        } else {
            return res.status(403).json({ message: 'Authorization Token Missing❗', err });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong while verifying token!', err });
    }
}

module.exports = authentication;