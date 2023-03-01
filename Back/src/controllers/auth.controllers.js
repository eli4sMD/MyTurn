const ctrl = {};
const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const generarJWT = require('../helpers/generarJWT');


ctrl.register = async(req, res)=>{

    const {nombre, apellido, dni, telefono, sexo, fechadenacimiento, direccion, correo, contraseña} = req.body;

    const nuevaContraseña = bcrypt.hashSync(contraseña, 10);

    const nuevoUsuario = new userModel({
        nombre, apellido, dni, telefono, sexo, fechadenacimiento, direccion, correo, contraseña: nuevaContraseña
    });

    const guardarUser = await nuevoUsuario.save();

    if(!guardarUser){
        return res.status(400).json({
            msg: 'Ha ocurrido un error al crear el usuario'
        })
    }

    return res.json({
        msg: 'Usuario creado con exito!'
    });

}

ctrl.login = async(req, res)=>{
    const {dni, contraseña} = req.body;

    const user = await userModel.findOne({dni});

    if(!user){
        return res.status(404).json({
            msg: 'No existe el usuario'
        })
    };

    const validarContraseña = bcrypt.compareSync(contraseña, user.contraseña);

    if(!validarContraseña){
        return res.status(400).json({
            msg: 'Contraseña incorrecta'
        })
    };  

    const token = await generarJWT({ uid: user._id })

    res.json({
        isLogged: true,
        token,
        role: user.role,
        nombre: user.nombre
    });

}

ctrl.validarPass = async (req,res)=>{

    const id = req.user._id

    const {contraseña} = req.body;

    const user = await userModel.findById(id);

    const validarContraseña = bcrypt.compareSync(contraseña, user.contraseña)

    if(!validarContraseña){
        return res.status(400).json({
            msg: 'Contraseña incorrecta'
        })
    }

    return res.json({
        msg: 'Contraseña correcta'
    });
}




module.exports = ctrl;