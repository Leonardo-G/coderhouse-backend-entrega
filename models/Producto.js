const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    typePrice: {
        current: {
            type: Number,
            required: true
        },
        old: {
            type: Number,
            default: 0      // Si el valor es 0, significa que no tenemos precio anterior o no hay descuento
        }
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
    delivery: {                 //Tipo de entrega -- DELIVERY
        type: Number,           //   0  --- El producto no dispone de envío por Mercado Libre,
        enum: [0, 1, 2],        //   1  --- El producto dispone de envio gratis.
        default: 0              //   2  --- El producto dispone de envio gratis - FULL 
    },
    recommended: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    }
})

module.exports = model("Producto", ProductoSchema);