const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
cloudinary.config( process.env.CLOUDINARY_URL );
const transporter = require("../../helpers/configNodemailer");

const Usuario = require("../../models/Usuario");
const generateJWT = require("../../helpers/generateJWT");


const createUser = async ( req = request, res = response ) => {

    const { username, password, email, password_repeat } = req.body;

    if( password !== password_repeat){
        res.render("auth/sign-in", { error: true, type: "No coinciden las contraseñas"});
        return;
    }

    if( !(username && password && email) ){
        res.render("auth/sign-in", { error: true, type: "Todos los campos son requeridos"});
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const obj = {
        username,
        password: hashPassword, 
        email,
        imgUrl: "https://res.cloudinary.com/dyxqlscek/image/upload/v1652413276/mercado-libre/general/perfil-vacio_tnctto.webp"
    }
    
    const usuario = new Usuario( obj );
    await usuario.save();

    //Envío de correo de bienvenida
    await transporter.sendMail({
        from: ' Bienvenido a MercadoLibre <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Se ha registrado MercadoLibre | clon ✔", // Subject line
        html: "<h1>Bienvenido a nuesto sitio</h1>", // html body
    });

    //Requisito del ejercicio del curso - enviar email al administrador cuando un usuario se registra
    await transporter.sendMail({
        from: `Nuevo usuario registrado <${email}>`, // sender address
        to: process.env.EMAIL_NODEMAILER_GMAIL, // list of receivers
        subject: `Se registro ${ username }`, // Subject line
        html: "<h1>Nuevo usuario registrado</h1>", // html body
    });

    const user = await Usuario.findOne({ email });

    const token = await generateJWT({ id: user._id });
    res.cookie("auth", {
        token,
        user: {
            username: user.username,
            email: user.email,
            imgUrl: user.imgUrl
        }
    }, { maxAge: 3600000} ).json({token})
}

const loginUser = async ( req = request, res = response ) => {
    const { email, password } = req.body;

    const getPassword = await Usuario.findOne({ email });

    if( !getPassword ){
        res.status(401).json({
            msg: "No hay un usuario registrado con este email"
        })
        return;
    }

    const comparePassword = bcrypt.compareSync( password, getPassword.password );

    if(!comparePassword){
        res.status(401).json({
            msg: "Email/Contraseña Incorrecta"
        })
        return;
    }

    const token = await generateJWT({id: getPassword._id});
    res.cookie("auth", {
        token,
        user: {
            username: getPassword.username,
            email: getPassword.email,
            imgUrl: getPassword.imgUrl
        }
    }, { maxAge: 3600000}).json({token})
}

const signOffUser = ( req = request, res = response ) => {

    res.clearCookie("auth").redirect("../../auth/login");
}

module.exports = {
    createUser,
    loginUser,
    signOffUser
}