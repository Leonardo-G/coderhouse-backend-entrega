const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgProduct: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Tecnologia, Herramientas"]
    },
    subtype: {
        type: String,
        required: true
    },
    characteristics: {
        type: [ String ],
        default: []
    },
    recommended: {
        type: Boolean,
        default: false
    }
})

module.exports = model("Producto", ProductoSchema);