const ContenedorMongo = require("../../containers/ContenedorMongo");
const Order = require("../../models/Order");

class OrderDAO extends ContenedorMongo{
    constructor(){
        super(Order)
    }
}

module.exports = OrderDAO;