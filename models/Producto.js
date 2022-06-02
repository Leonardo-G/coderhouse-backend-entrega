const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    imgProduct: {
        type: [ String ],
        default: []
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    characteristics: {
        type: [ String ],
        default: []
    },
    stock:{
        type: Number,
        default: 0
    },
    recommended: {
        type: Boolean,
        default: false
    }
})

module.exports = model("Producto", ProductoSchema);