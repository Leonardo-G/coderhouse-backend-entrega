const ContenedorMongo = require("../../containers/ContenedorMongo");
const SubCategory = require("../../models/SubCategory");

class SubCategoryDAO extends ContenedorMongo{
    constructor(){
        super(SubCategory)
    }
}

module.exports = SubCategoryDAO;