const { request, response } = require("express");
const Cart = require("../../models/Cart");
const Usuario = require("../../models/Usuario");

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

const createCart = async ( req = request, res = response ) => {
    
    const { cartUser } = req.body;

    const user = await Usuario.findById(cartUser);

    if(!user){
        return res.status(404).json({
            msg: `No se encontro un usuario con el 'id' ${ cartUser }`
        })
    }

    const isExistCart = await Cart.findOne({ cartUser })

    if(isExistCart){
        return res.status(401).json({
            msg: `Ya existe un carrito del usuario con el ID ${cartUser}`
        })
    }

    const cart = new Cart({cartUser, productsCart: []});
    const save = await cart.save()
    res.json(save)
}

const updateCart = async ( req = request, res = response ) => {
    const { id } = req.params;

    const isExistCart = await Cart.findOne({ id });
    if( !isExistCart ){
        return res.status(401).json({
            msg: `No existe un carrito del usuario ${ id }. Primero crear el carrito en /api/cart/:id con el método POST`
        })
    }

    const { productsCart } = req.body;
    const cart = await Cart.findOneAndUpdate({ userCart: id }, { $set: { productsCart } }, { new: true });
    
    res.status(201).json(cart);

}

const clearCart = async ( req = request, res = response ) => {
    const { id } = req.params;

    Cart.findOneAndUpdate( { cartUser: id}, { $set: { productsCart: [] }}, { new: true }, ( err, obj ) => {
        if( err ){
            return console.log(err)
        }

        if(!obj){
            return res.status(404).json({
                msg: `No se encontro el carrito del usuario con el id ${ id }`
            })
        }

        res.json(obj);
    })
}

module.exports = {
    getCart,
    createCart,
    updateCart,
    clearCart
}