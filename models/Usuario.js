const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    created: {
        type: String,
        default: Date.now()
    },
    password: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Usuario", UsuarioSchema);