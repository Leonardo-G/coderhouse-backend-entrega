const { default: mongoose } = require("mongoose");

class ContenedorMongo{
    constructor(colection = mongoose.Model){
        this.colection = colection;
    }

    async findAll(){
        const documents = await this.colection.find({})
        return documents;
    }

    async findDocuments(filter){
        if(typeof filter != "object"){
            throw new Error("El parametro de busqueda tiene que ser de tipo 'OBJECT'");
        }

        const documents = await this.colection.find(filter);
        return documents;
    }
}

module.exports = ContenedorMongo;