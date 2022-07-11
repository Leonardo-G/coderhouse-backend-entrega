const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const UsuarioDAO = require("../service/DAO/UsuarioDAO");
const Usuario = new UsuarioDAO();

const validateJWT = async ( req = request, res = response, next) => {
    const token = req.header("auth-token");

    if(!token){
        res.status(400).json({
            msg: "Se necesita un token al realizar la petición en esta url"
        })
    }

    try {
        const tokenVerify = jwt.verify(token, process.env.SECRET_JWT);

        //Verificar si el usuario existe
        const isUsuarioExist = await Usuario.findDocumentById(tokenVerify.id); 
        
        if(!isUsuarioExist){
            res.status(401).json({
                msg: "el usuario no existe en nuestra base de datos"
            })
        }

        req.id = tokenVerify.id;
        console.log(req.id)

        next();

    } catch (error) {
        res.status(401).json({
            msg: "Token no válido"
        })
    }
}

module.exports = validateJWT;