const { response } = require("express");
const { request } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Product = require("../../models/Producto");

const getProductsByCategory = ( req = request, res = response ) => {
    const { subcategory } = req.params;
    
    console.log(subcategory);

}

const newProduct = async ( req = request, res = response ) => {
    const { title, price, subCategory, category, characteristics } = req.body;

    const img = req.files.imgProduct;
    const { secure_url } = await cloudinary.uploader.upload( img.tempFilePath, { file: `mercado-libre/${category}/${subCategory}`} );

    const obj = {
        title,
        price,
        subCategory,
        category,
        characteristics: JSON.parse(characteristics),
        imgProduct: [secure_url]
    }

    const product = new Product(obj);
    await product.save();

    res.status(201).json(obj);

}

module.exports = {
    getProductsByCategory,
    newProduct
}