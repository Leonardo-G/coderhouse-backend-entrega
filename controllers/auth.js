const { response } = require("express");
const { request } = require("express");
const Usuario = require("../models/Usuario");

const signInVista = ( req = request, res = response ) => {
    res.status(200).render("auth/sign-in");
}

const createUser = async ( req = request, res = response ) => {

    const { username, password, email } = req.body;

    const usuario = new Usuario({ username, password, email });
    
    await usuario.save()

    res.redirect("../home");
}

module.exports = {
    signInVista,
    createUser
}