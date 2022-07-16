const { response, request } = require("express");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const newImage = async ( req = request, res = response ) => {

    if( req.files.imgProduct ){
        try {
            const img = req.files.imgProduct;
            const { secure_url } = await cloudinary.uploader.upload( img.tempFilePath, { file: `mercado-libre/producto/`} );
        
            res.status(201).json({
                imgUrl: secure_url
            })
            
        } catch (error) {
            res.status(500).json({
                msg: "Error en crear una nueva imagen"
            })
        }

    } else {
        res.status(201).json({
            imgUrl: ""
        })
    }



}

module.exports = {
    newImage
};