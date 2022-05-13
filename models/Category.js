const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    category: {
        type: String,
        required: true
    }
})

module.exports = model("Category", CategorySchema);