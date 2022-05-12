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

    res.redirect("../home");
}

const loginUser = async ( req = request, res = response ) => {
    const { email, password } = req.body;

    const getPassword = await Usuario.findOne({ email });
    const comparePassword = bcrypt.compareSync( password, getPassword.password );


    res.redirect("../home");
}

module.exports = {
    signInVista,
    createUser,
    loginVista,
    loginUser
}