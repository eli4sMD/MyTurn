const jwt = require('jsonwebtoken');

const generarJWT = (id)=>{
    return new Promise((resolve, reject) => {
        jwt.sign(id, process.env.SECRET,{
            expiresIn: 60*60*3
        }, (err, token)=>{
            (err)?reject(err):resolve(token);
        })
    }) 
}

module.exports = generarJWT;