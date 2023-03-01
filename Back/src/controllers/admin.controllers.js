const turnosModel = require("../model/turnos.model");
const userModel = require("../model/user.model");
const moment = require('moment');
const especialidadModel = require("../model/especialidad.model");

moment.locale('es')

const ctrl = {}


ctrl.verDetalles = async(req, res)=>{

    const id = req.params.id;

    const datos = await userModel.findById(id, {contraseña: 0});

    if(!datos){
        return res.status(400).json({
            msg: 'Ha ocurrido un error'
        })
    }

    return res.json(datos);

}


ctrl.turnosadmin = async(req, res)=>{

    const {dni, nombre, apellido, especialidad, fecha} = req.body

    if(dni || nombre || apellido || especialidad || fecha){
        
            let dataUsuario = {
                dni,
                nombre: { $regex: nombre, $options: "i" },
                apellido: { $regex: apellido, $options: "i" }
            } 

            let dataTurno = {
                especialidad,
                fecha: moment(fecha).format('LL')
            }

        if(dni || nombre || apellido){

            if(!dni){
                delete dataUsuario.dni
            }
            if(!nombre){
                delete dataUsuario.nombre
            }
            if(!apellido){
                delete dataUsuario.apellido
            }
            if(!especialidad){
                delete dataTurno.especialidad
            }
            if(!fecha){
                delete dataTurno.fecha
            }

            const turnos = await turnosModel.find(dataTurno).populate({
                path: 'idUsuario',
                match: dataUsuario
            }).sort({createdAt: -1});
            

            const resp = turnos.filter((e)=>e.idUsuario !== null);

            return res.json(resp);

        }

        if(!especialidad){
            delete dataTurno.especialidad
        }
        if(!fecha){
            delete dataTurno.fecha
        }


        const turnos = await turnosModel.find(dataTurno).populate('idUsuario', {contraseña: 0}).sort({createdAt: -1});
    
        return res.json(turnos);
    
    }

    const turnos = await turnosModel.find().populate('idUsuario', {contraseña: 0}).sort({createdAt: -1});

    return res.json(turnos);

}

ctrl.pacientes = async(req,res)=>{
    const {dni, nombre, apellido, fecha} = req.body

    if(dni || nombre || apellido || fecha){
        
            let dataUsuario = {
                dni,
                nombre: { $regex: nombre, $options: "i" },
                apellido: { $regex: apellido, $options: "i" }
            } 


        if(dni || nombre || apellido){

            if(!dni){
                delete dataUsuario.dni
            }
            if(!nombre){
                delete dataUsuario.nombre
            }
            if(!apellido){
                delete dataUsuario.apellido
            }
        
            console.log(dataUsuario);

            const paciente = await userModel.find(dataUsuario).find({role: 'paciente'}).sort({createdAt: -1});

            console.log(paciente);


            return res.json(paciente);

        }
    }

    const pacientes = await userModel.find({role: 'paciente'}).sort({createdAt: -1});

    return res.json(pacientes);
}

ctrl.obtenerEspecialidades = async(req, res)=>{
    
    const data = await especialidadModel.find();

    return res.json(data);

}


ctrl.cargarEspecialidad = async(req, res)=>{
    
    const {especialidad} = req.body;

    console.log(especialidad);
    const nuevaEspecialidad = new especialidadModel({
        especialidad
    })

    const guardar = await nuevaEspecialidad.save();

    if(!guardar){
        return res.status(400).json({
            msg: 'Error al guardar'
        })
    }

    return res.json(nuevaEspecialidad)

}

ctrl.eliminar = async(req, res)=>{

    const eliminar = await especialidadModel.findByIdAndDelete(req.params.id)

    if(eliminar){
        return res.json({
            msg: 'Eliminado'
        })
    }

}



module.exports = ctrl;