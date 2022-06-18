const ContenedorMongo = require("../../containers/ContenedorMongo");
const Favorite = require("../../models/Favorite");

class FavoriteDAO extends ContenedorMongo{
    constructor(){
        super(Favorite)
    }
}

module.exports = FavoriteDAO;