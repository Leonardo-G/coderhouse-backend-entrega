const ContenedorMongo = require("../../containers/ContenedorMongo");
const Product = require("../../models/Producto");

class ProductDAO extends ContenedorMongo{
    constructor(){
        super(Product)
    }
}

module.exports = ProductDAO;