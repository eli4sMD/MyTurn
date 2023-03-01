const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');

const validarJWT = async (req, res, next) => {

    const token = req.headers.token;

    if (!token) {
        res.status(400).json({
            msg: 'No token received'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET);

        const user = await userModel.findById(uid);

        if (!user) {
            res.status(404).json({
                msg: 'No user found'
            });
        }

        if (!user.isActive) {
            res.status(400).json({
                msg: 'User is inactive'
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Authentication error'
        })
    }

}

module.exports = validarJWT;