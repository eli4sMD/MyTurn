const turnosModel = require("../model/turnos.model");
const userModel = require("../model/user.model");
const bcrypt = require('bcrypt');
const ctrl = {}

const moment = require('moment');
moment.locale('es')


ctrl.solicitarTurno = async (req, res) => {

    const { especialidad, fecha, hora } = req.body;


    const nuevoTurno = new turnosModel({
        especialidad, fecha: moment(fecha).format("LL"), fechanumerica: fecha, hora, idUsuario: req.user._id
    })

    const guardarTurno = await nuevoTurno.save();

    if (!guardarTurno) {
        return res.status(400).json({
            msg: 'Ha ocurrido un error al solicitar el turno'
        })
    }

    res.json({
        msg: 'Turno solicitado!'
    });
}

ctrl.misTurnos = async (req, res) => {

    const turnos = await turnosModel.find({idUsuario: req.user._id});

    if(!turnos){
        return res.status(400).json({
            msg: 'Ha ocurrido un error'
        })
    }

    res.json(turnos);
}

ctrl.turnos = async(req, res)=>{
    const turnos = await turnosModel.find();

    res.json(turnos);
}


ctrl.cancelarTurno = async(req, res)=>{

    const {id} = req.params;

    const eliminarTurno = await turnosModel.findByIdAndDelete(id);

    if(!eliminarTurno){
        return res.status(400).json({
            msg: 'Error al cancelar el turno'
        })
    }

    res.json({
        msg: 'Turno cancelado con exito'
    })

}

ctrl.misDatos = async(req, res)=>{
    const id = req.user._id

    const data = await userModel.findById(id, {contraseña: 0});

    res.json(data);
}

ctrl.editarDatos = async(req, res)=>{
    
    const {nombre, apellido, dni, telefono, sexo, fechadenacimiento, direccion, correo} = req.body;
    const id = req.user._id;

    const editarDatos = await userModel.findByIdAndUpdate(id, {nombre, apellido, dni, telefono, sexo, fechadenacimiento, direccion, correo});

    if(!editarDatos){
        return res.status(400).jsoN({
            msg: 'Error al actualizar los datos'
        })
    }

    res.json({
        msg: 'Los datos han sido actualizados'
    })
}

ctrl.cambiarPass = async(req, res)=>{

    
    const {contraseñaActual, contraseñaNueva} = req.body;
    
    const id = req.user._id

    const user = await userModel.findById(id)

    const validarContraseña = bcrypt.compareSync(contraseñaActual, user.contraseña);

    if(!validarContraseña){
        return res.status(400).json({
            msg: 'La contraseña actual no es correcta'
        })
    }

    const passCifrada = bcrypt.hashSync(contraseñaNueva, 10);

    if(!passCifrada){
        return res.status(400).json({
            msg: 'Ha ocurrido un error'
        })
    }

    const changepass = await userModel.findByIdAndUpdate(id, {contraseña: passCifrada})


    if(!changepass){
        return res.status(400).json({
            msg: 'Ha ocurrido un error'
        })
    }

    return res.json({
        msg: 'La contraseña ha sido cambiada correctamente'
    })

}


module.exports = ctrl;