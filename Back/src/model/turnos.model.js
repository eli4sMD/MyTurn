const {Schema, model, SchemaTypes} = require('mongoose');

const turnosSchema = new Schema({
    especialidad: {
        type: String,
        require: true
    },
    fecha: {
        type: String,
        require: true
    },
    fechanumerica: {
        type: String,
        require: true
    },
    hora: {
        type: String,
        require: true
    },
    idUsuario: {
        type: SchemaTypes.ObjectId, ref: 'usuarios',
        require: true
    }
}, {versionKey: false, timestamps: true});

module.exports = model('turnos', turnosSchema);