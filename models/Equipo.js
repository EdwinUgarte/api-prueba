const { Schema, model } = require("mongoose");


const EquipoSchema = Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },

    pais: {
        type: String,
        require: true
    }
})

module.exports = model('Equipo', EquipoSchema);