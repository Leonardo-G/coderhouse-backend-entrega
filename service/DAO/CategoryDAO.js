const ContenedorMongo = require("../../containers/ContenedorMongo");
const Category = require("../../models/Category");

class CategoryDAO extends ContenedorMongo{
    constructor(){
        super(Category)
    }
}

module.exports = CategoryDAO;