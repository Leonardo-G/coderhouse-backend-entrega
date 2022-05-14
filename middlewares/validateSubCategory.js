const Category = require("../models/Category");

const validateSubCategory = async ( req = request, res = response, next ) => {
    const { category, subCategory } = req.body;
    
    const getSubCategories = await Category.findOne({ category });
    
    if(!getSubCategories.subCategory.includes(subCategory)){
        return res.status(401).json({
            msg: `La sub-categoria ${ subCategory } no existe en nuestra base de datos`
        })
    }

    next();

}

module.exports = validateSubCategory;