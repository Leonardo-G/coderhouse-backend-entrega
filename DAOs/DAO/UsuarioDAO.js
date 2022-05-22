const ContenedorMongo = require("../ContenedorMongo");
const Usuario = require("../../models/Usuario");

class UsuarioDAO extends ContenedorMongo{
    constructor(){
        super(Usuario)
    }
}

module.exports = UsuarioDAO;