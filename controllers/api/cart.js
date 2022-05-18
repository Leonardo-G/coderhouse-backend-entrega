const { request, response } = require("express");
const Cart = require("../../models/Cart");

const getCart = async ( req = request, res = response ) => {
    const { id } = req.params;

    const cart = await Cart.findById(id);
    
    if(!cart){
        return res.status(401).json({
            msg: `No se encontro un 'Cart' coincidente con el id ${ id }`
        })
    }

    res.status(200).json(cart);
}

const createCart = ( req = request, res = response ) => {
    
    
}

module.exports = {
    createCart,
    getCart
}