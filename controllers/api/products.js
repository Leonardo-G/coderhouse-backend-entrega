const { response } = require("express");
const { request } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Product = require("../../models/Producto");
const twilio = require("twilio");

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
    const { subcategory,  } = req.params;
    const { skip, limit } = req.query;
    
    const [total, products] = await Promise.all([ 
        Product.find({ subCategory: subcategory }).count(),
        Product.find({ subCategory: subcategory })
            .skip( Number(skip) || 0 )
            .limit( Number(limit) || 6 )
        ]);

    res.status(200).json({
        totalProductsOfSubCategory: total,
        products
    })
}

const getProductById = async ( req = request, res = response ) => {
    const { id } = req.params;

    if(!id){
        return res.status(401).json({
            msg: "se requiere un id"
        })
    }

    const product = await Product.findById(id);
    
    res.status(200).json(product);
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

const sendSMS = async ( req, res ) => {
    const sid = "ACb738cc0e66915be7c05e53f5d937260b";
    const twilioToken = "ba9681d64cb819d353d4f6bb9f7d3402";

    const client = twilio(sid, twilioToken);
    console.log("HOLA")

    try {
        const message = await client.messages.create({
            messagingServiceSid: 'MG040fae6b301fbc5c644fd9de46dcc409',
            body: 'Soy leo, si te llega este mensaje avisame',
            to: '+541173654878'
        })
        res.json({message})
        console.log(message)
     } catch (error) {
        console.log(error)
     }
     
}

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductsBySubCategory,
    getProductById,
    newProduct,
    sendSMS
}