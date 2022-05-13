const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    type: {
        required: true,
        enum: ["Herramientas", "Tecnologia"]
    },
    subtype: {
        type: String,
        required: true,
    },
    imgUrl: {
        required: true,
        type: String
    }
})

module.exports = model( "Category", CategorySchema );

