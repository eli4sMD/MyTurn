const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    dni: {
        type: Number,
        require: true
    },
    telefono: {
        type: Number,
        require: true
    },
    fechadenacimiento: {
        type: String,
        require: true
    },
    sexo: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true
    },
    contraseña: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'paciente'
    },
    isActive:{
        type: Boolean,
        default: true
    }
}, {versionKey: false, timestamps: true});

module.exports = model('usuarios', usuarioSchema);