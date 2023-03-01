const {Schema, model} = require('mongoose');

const especialidadSchema = new Schema({
    especialidad: {
        type: String,
        require: true
    }
}, {versionKey: false, timestamps: true});

module.exports = model('especialidades', especialidadSchema);