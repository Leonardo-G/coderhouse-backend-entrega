const { response } = require("express");
const { request } = require("express");
const Category = require("../models/Category");

const validateCategory = async ( req = request, res = response, next ) => {
    const { category } = req.body;

    let categories = [];
    
    const allCategories = await Category.find({});
    allCategories.map( category => {
        categories.push(category.category);
    })
    
    if(!categories.includes(category)){
        return res.status(401).json({
            msg: `La categoria ${ category } no existe en nuestra base de datos`
        })
    }

    next();

}

module.exports = validateCategory;