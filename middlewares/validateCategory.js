const { response } = require("express");
const { request } = require("express");

const validateCategory = ( req = request, res = response, next ) => {
    const { type, subtype } = req.body;

}