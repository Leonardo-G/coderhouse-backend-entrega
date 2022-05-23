const ContenedorMongo = require("../../containers/ContenedorMongo");
const Usuario = require("../../models/Usuario");

class UsuarioDAO extends ContenedorMongo{
    constructor(){
        super(Usuario)
    }
}

module.exports = UsuarioDAO;