const { Schema, model } = require("mongoose");

const subCategorySchema = new Schema({
    category: {
        type:String,
        required: true
    },
    subCategory: {
        type: String,
        required: true,
        unique: true
    },
    imgSubCategory: {
        required: true,
        type: String
    }
})

module.exports = model( "subCategory", subCategorySchema );

