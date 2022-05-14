const { response } = require("express");
const { request } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Product = require("../../models/Producto");

const getProducts = async ( req = request, res = response ) => {
    const { skip, limit } = req.params;
    
    const [total, products] = await Promise.all([ 
        Product.find({}).count(),
        Product.find({})
            .skip( Number(skip) || 0 )
            .limit( Number(limit) || 6 )
        ]);

    res.status(200).json({
        totalProducts: total,
        products
    })
}

const getProductsByCategory = async ( req = request, res = response ) => {
    const { category } = req.params;
    const { skip, limit } = req.query; 
    
    const [total, products] = await Promise.all([ 
                        Product.find({category}).count(),
                        Product.find({ category })
                            .skip( Number(skip) || 0 )
                            .limit( Number(limit) || 6 )
                        ]);
    res.status(200).json({
        totalProductsOfCategory: total,
        products
    })
}

const getProductsBySubCategory = async ( req = request, res = response ) => {
    const { subcategory, category } = req.params;
    const { skip, limit } = req.params;
    
    const [total, products] = await Promise.all([ 
        Product.find({ category, subCategory: subcategory }).count(),
        Product.find({ category, subCategory: subcategory })
            .skip( Number(skip) || 0 )
            .limit( Number(limit) || 6 )
        ]);

    res.status(200).json({
        totalProductsOfSubCategory: total,
        products
    })
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
    getProducts,
    getProductsByCategory,
    getProductsBySubCategory,
    newProduct,
}