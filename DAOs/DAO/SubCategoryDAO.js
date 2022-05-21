const ContenedorMongo = require("../ContenedorMongo");
const SubCategory = require("../../models/SubCategory");

class SubCategoryDAO extends ContenedorMongo{
    constructor(){
        super(SubCategory)
    }
}

module.exports = SubCategoryDAO;