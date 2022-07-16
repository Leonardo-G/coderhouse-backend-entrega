const { response } = require("express");
const { request } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const ProductDTO = require("../../classes/ProductDTO"); 

const twilio = require("twilio");

const ProductDao = require("../../service/DAO/ProductDAO");
const Product = new ProductDao();

const UserDAO = require("../../service/DAO/UsuarioDAO");
const User = new UserDAO();

const getProducts = async ( req = request, res = response ) => {
    const { skip, limit } = req.params;
    
    const [total, products] = await Promise.all([ 
            Product.documentsCount({}),
            Product.findDocuments({}, { skip, limit })
        ]);

    const productsDTO = products.map( product => {
        return new ProductDTO(product);
    })
    
    res.status(200).json({
        totalProducts: total,
        products: productsDTO.map( p => p.obj)
    })
}

const getProductsByCategory = async ( req = request, res = response ) => {
    const { category } = req.params;
    const { skip, limit } = req.query; 
    
    const [total, products] = await Promise.all([ 
                            Product.documentsCount({ category }),
                            Product.findDocuments({ category }, { skip, limit })
                        ]);

    res.status(200).json({
        totalProductsOfCategory: total,
        products
    })
}

const getProductsBySubCategory = async ( req = request, res = response ) => {
    const { subcategory } = req.params;
    const { skip, limit } = req.query;
    
    const [total, products] = await Promise.all([ 
            Product.documentsCount( { subCategory: subcategory } ),
            Product.findDocuments( { subCategory: subcategory }, { skip, limit } )
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

    const product = await Product.findDocumentById(id, { ref: "usuario", key: ["username"]});
    const { obj } = new ProductDTO(product)
    res.status(200).json(obj);
}

const newProduct = async ( req = request, res = response ) => {
    const { title, typePrice, subCategory, category, characteristics, stock, description, delivery, imgProduct } = req.body;

    const obj = {
        usuario: req.id,
        title,
        imgProduct,
        category,
        subCategory,
        characteristics,
        typePrice,
        stock,
        description,
        delivery
    }
    
    const product = await Product.createDocument(obj);

    res.status(201).json(product);

}

const updateProduct = async ( req = request, res = response ) => {
    const { id } = req.params;

    const product = await Product.findOneDocument( { byUser: req.id, _id: id } ); //REQ.ID, proviene del VALIDATEJWT.js

    if(!product){
        res.status(404).json({
            msg: "No se encontro el producto. "
        })
    }

    if( product.byUser != req.id ){
        res.status(404).json({
            msg: "El usuario no puede acceder a un producto que no haya creado"
        })
    }
    
    const userUpdate = await Product.findDocumentAndUpdate({ byUser: req.id, _id: id }, req.body)
   
    res.status(201).json(userUpdate);
}

const sendSMS = async ( req, res ) => {
    // const sid = "ACb738cc0e66915be7c05e53f5d937260b";
    // const twilioToken = "ba9681d64cb819d353d4f6bb9f7d3402";

    // const client = twilio(sid, twilioToken);
    // console.log("HOLA")

    // try {
    //     const message = await client.messages.create({
    //         messagingServiceSid: 'MG040fae6b301fbc5c644fd9de46dcc409',
    //         body: 'Soy leo, si te llega este mensaje avisame',
    //         to: '+541173654878'
    //     })
    //     res.json({message})
    //     console.log(message)
    //  } catch (error) {
    //     console.log(error)
    //  }
     
}

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductsBySubCategory,
    getProductById,
    newProduct,
    updateProduct,
    sendSMS
}