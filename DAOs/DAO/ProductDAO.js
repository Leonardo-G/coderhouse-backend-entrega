const ContenedorMongo = require("../ContenedorMongo");
const Product = require("../../models/Producto");

class ProductDAO extends ContenedorMongo{
    constructor(){
        super(Product)
    }
}

module.exports = ProductDAO;