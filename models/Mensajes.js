const { Schema, model  } = require("mongoose");

const MensajeSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    tipo:{
        type: String,
    },
    sala:{
        type: String,
        default: 'general'
    },
    mensaje: {
        type: String,
        required: true
    },
    fecha: String
})

module.exports = model("Mensaje", MensajeSchema);