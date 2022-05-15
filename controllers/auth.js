const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
cloudinary.config( process.env.CLOUDINARY_URL );
const transporter = require("../helpers/configNodemailer");

const Usuario = require("../models/Usuario");

const signInVista = ( req = request, res = response ) => {
    res.status(200).render("auth/sign-in");
}

const loginVista = ( req = request, res = response ) => {
    res.status(200).render("auth/login");
}

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

    req.session.user = {
        isLogged: true,
        name: email
    };

    res.redirect("../");
}

const loginUser = async ( req = request, res = response ) => {
    const { email, password } = req.body;

    const getPassword = await Usuario.findOne({ email });
    console.log(getPassword)
    if( !getPassword ){
        res.render("auth/login", { error: true, type: "No hay un usuario registrado con este email"});
        return;
    }
    const comparePassword = bcrypt.compareSync( password, getPassword.password );

    if(!comparePassword){
        res.render("auth/login", { error: true, type: "Email/Contraseña Incorrecta"});
        return;
    }

    req.session.user = {
        isLogged: true,
        name: email
    };

    res.redirect("../");
}

module.exports = {
    signInVista,
    createUser,
    loginVista,
    loginUser
}