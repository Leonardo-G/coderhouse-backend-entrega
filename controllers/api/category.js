const { response } = require("express");
const { request } = require("express");
const SubCategory = require("../../models/subCategory");

const getCategories = async ( req = request, res = response ) => {
    const category = await Category.find({});
    
    res.status(200).json(category);
}

const getSubCategories = async ( req = request, res = response ) => {
    const { category } = req.params;

    const subCategories = await SubCategory.find({ category });
    res.status(200).json(subCategories);
}

module.exports = {
    getCategories,
    getSubCategories
};