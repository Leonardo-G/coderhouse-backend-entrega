const ContenedorMongo = require("../ContenedorMongo");
const Cart = require("../../models/Cart");

class CartDAO extends ContenedorMongo{
    constructor(){
        super(Cart)
    }
}

module.exports = CartDAO;