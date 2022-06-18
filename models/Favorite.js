const { Schema, model } = require("mongoose");

const SchemaFavorite = new Schema({
    favUser: {
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },
    prodFavorites: [{
        type: Schema.Types.ObjectId,
        ref: "Producto",
        default: []
    }]
})

module.exports = model("Favorite", SchemaFavorite);