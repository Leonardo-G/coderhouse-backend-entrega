const { response } = require("express");
const { request } = require("express");
const SubCategoryDao = require("../../service/DAO/SubCategoryDAO");
const CategoryDAO = require("../../service/DAO/CategoryDAO");

const Category = new CategoryDAO();
const SubCategory = new SubCategoryDao();

const getCategories = async ( req = request, res = response ) => {
    const category = await Category.findAll();
    
    res.status(200).json(category);
}

const getSubCategories = async ( req = request, res = response ) => {
    const { category } = req.params;
    const { skip = 0, limit = 5 } = req.query;

    try {
        const subCategories = await SubCategory.findDocuments({ category }, { skip, limit });
        res.status(200).json(subCategories);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error en pasar el tipo de dato. Funcion 'getSubCategories'"
        });
    }
}

module.exports = {
    getCategories,
    getSubCategories
};