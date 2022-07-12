const { default: mongoose, Schema } = require("mongoose");

const OrderSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },
    address: {
        type: String,
        required: true
    },
    totalPrice: {
        required: true,
        type: Number
    },
    date: {
        type: String,
        default: Date.now()
    },
    products: [{
        idProduct: {
            type: Schema.Types.ObjectId,
            ref: "Producto"
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    state: {
        type: String,
        default: "Generated"
    }
}) 

module.exports = mongoose.model("order", OrderSchema)