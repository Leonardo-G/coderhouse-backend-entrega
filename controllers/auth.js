const { response } = require("express");
const { request } = require("express");

const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const signInVista = ( req = request, res = response ) => {
    res.status(200).render("auth/sign-in");
}

const loginVista = ( req = request, res = response ) => {
    res.status(200).render("auth/login");
}

const createUser = async ( req = request, res = response ) => {

    const { username, password, email } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    
    const usuario = new Usuario({ username, password: hashPassword, email });
    await usuario.save();

    req.session.user = {
        isLogged: true,
        name: email
    };

    res.redirect("../home");
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

    res.redirect("../home");
}

module.exports = {
    signInVista,
    createUser,
    loginVista,
    loginUser
}