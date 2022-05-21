const { response } = require("express");
const { request } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const Category = require("../../models/Category");
const SubCategory = require("../../models/SubCategory");

const newCategory = async ( req = request, res = response ) => {
    if( !req.body.admin ){
        return res.status(401).json({
                msg: "No permitido. No eres un administrador"
            })
    }

    const category = new Category({ category: req.body.category, subCategory: req.body.subCategory })

    await category.save();

    res.status(201).json({
        msg: "Categoria creada"
    })
}

const addImgSubCategory = async ( req = request, res = response ) => {
    const { category, subCategory, admin } = req.body;
    const imgUrl = req.files.imgSubCategory.tempFilePath;

    if(!admin){
        return res.status(401).json({
            msg: "No tienes permisos de administrador"
        });
    }

    const { secure_url } = await cloudinary.uploader.upload( imgUrl, { folder: `mercado-libre/${category}/${subCategory}`});
    
    const obj = {
        category,
        subCategory,
        imgSubCategory: secure_url
    };

    const newSubCategory = new SubCategory(obj)

    await newSubCategory.save()
    
    res.json({
        check: "Imagen de la Sub Categoria creada"
    })

}

module.exports = {
    newCategory,
    addImgSubCategory
}