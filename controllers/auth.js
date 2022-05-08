const { response } = require("express");
const { request } = require("express");

const signInVista = ( req = request, res = response ) => {
    res.status(200).render("auth/sign-in");
}

module.exports = {
    signInVista,
}