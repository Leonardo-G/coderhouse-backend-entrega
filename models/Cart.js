const { Schema, model } = require("mongoose");

const SchemaCart = new Schema({
    cartUser: {
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },
    productsCart: [{
        idProduct: {
            type: Schema.Types.ObjectId,
            ref: "Producto"
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    createCart: {
        type: String,
        default: Date.now()
    },
    adress: {
        type: String,
        required: true
    }

})

module.exports = model("Cart", SchemaCart);