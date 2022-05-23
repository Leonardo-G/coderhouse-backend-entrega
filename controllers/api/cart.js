const { request, response } = require("express");
const CartDao = require("../../service/DAO/CartDAO");
const UsuarioDao = require("../../service/DAO/UsuarioDAO");

const Cart = new CartDao();
const Usuario = new UsuarioDao();

const getCart = async ( req = request, res = response ) => {
    const { id } = req.params;

    const cart = await Cart.findDocumentById(id);
    
    if(!cart){
        return res.status(401).json({
            msg: `No se encontro un 'Cart' coincidente con el id ${ id }`
        })
    }

    res.status(200).json(cart);
}

const createCart = async ( req = request, res = response ) => {
    
    const { cartUser } = req.body;

    try {
        const user = await Usuario.findDocumentById(cartUser);
        
        if(!user){
            return res.status(404).json({
                msg: `No se encontro un usuario con el 'id' ${ cartUser }`
            })
        }
        
        const isExistCart = await Cart.findOneDocument({ cartUser });
        
        if(isExistCart){
            return res.status(401).json({
                msg: `Ya existe un carrito del usuario con el ID ${cartUser}`
            })
        }
        
        const cart = Cart.createDocument({cartUser, productsCart: []});
        res.status(201).json(cart)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor. Funcion 'createCart"
        })
    }

}

const updateCart = async ( req = request, res = response ) => {
    const { id } = req.params;

    const isExistCart = await Cart.findOneDocument({ id });
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

    const cart = await Cart.findDocumentAndUpdate({ cartUser: id}, { productsCart: [] })
    
    res.json(cart);
}

module.exports = {
    getCart,
    createCart,
    updateCart,
    clearCart
}