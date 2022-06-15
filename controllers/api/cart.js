const { request, response } = require("express");
const CartDao = require("../../service/DAO/CartDAO");
const UsuarioDao = require("../../service/DAO/UsuarioDAO");

const Cart = new CartDao();
const Usuario = new UsuarioDao();

const getCart = async ( req = request, res = response ) => {

    const cart = await Cart.findOneDocument({cartUser: req.id});
    
    if(!cart){
        return res.status(401).json({
            msg: `No se encontro un 'Cart' coincidente con el id ${ req.id }`
        })
    }

    res.status(200).json(cart);
}

const createCart = async ( req = request, res = response ) => {
    //Si se llega al controller, es porque existe un usuario que se válido en el middleware 'validateJWT'
    
    try {
        const isExistCart = await Cart.findOneDocument({ cartUser: req.id });
        
        if(isExistCart){
            return res.status(401).json({
                msg: `Ya existe un carrito del usuario con el ID ${req.id}`
            })
        }
        
        const cart = await Cart.createDocument({cartUser: req.id, productsCart: []});
        res.status(201).json(cart)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor. Funcion 'createCart"
        })
    }

}

const updateCart = async ( req = request, res = response ) => {

    const isExistCart = await Cart.findOneDocument({ cartUser: req.id });
    
    if( !isExistCart ){
        return res.status(401).json({
            msg: `No existe un carrito del usuario ${ req.id }. Primero crear el carrito en /api/cart con el método POST`
        })
    }

    const { productsCart } = req.body;
    let cart;

    const cartProducts = isExistCart.productsCart.filter( c => c.idProduct != productsCart[0].idProduct );
    
    if( productsCart[0].quantity === 0 ){
        //si el producto modificado tiene como 'quantity' == 0, se eliminara del carrito
        cart = await Cart.findDocumentAndUpdate({ cartUser: req.id }, { productsCart: [...cartProducts] });
    }else {
        cart = await Cart.findDocumentAndUpdate({ cartUser: req.id }, { productsCart: [...cartProducts, ...productsCart] });
    }
    
    res.status(201).json(cart);
}

const clearCart = async ( req = request, res = response ) => {
    const cart = await Cart.findDocumentAndUpdate({ cartUser: req.id}, { productsCart: [] })
    
    res.json(cart);
}

module.exports = {
    getCart,
    createCart,
    updateCart,
    clearCart
}