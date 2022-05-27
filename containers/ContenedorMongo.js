const { default: mongoose } = require("mongoose");

class ContenedorMongo{
    constructor(colection = mongoose.Model){
        this.colection = colection;
    }

    async documentsCount(filter){
        if(typeof filter != "object"){
            throw new Error("El parametro de busqueda tiene que ser de tipo 'OBJECT'");
        }

        const documentsCount = await this.colection.find(filter).count();
        return documentsCount;
    }

    async findAll(){
        const documents = await this.colection.find({})
        return documents;
    }

    async findOneDocument(filter){
        if(typeof filter != "object"){
            throw new Error("El parametro de busqueda tiene que ser de tipo 'OBJECT'");
        }

        const document = await this.colection.findOne(filter);
        return document;
    }

    async findDocumentById(id){
        const document = await this.colection.findById(id);
        return document;
    }

    async findDocuments(filter, query){
        if(typeof filter != "object"){
            throw new Error("El parametro de busqueda tiene que ser de tipo 'OBJECT'");
        }

        if(!query){
            const documents = await this.colection.find(filter);
            return documents;
        }else{
            const { skip = 0, limit = 6 } = query;
            
            const documents = await this.colection.find(filter)
                                    .skip( Number(skip) )
                                    .limit( Number(limit) )
                    
            return documents;
        }
    }

    async createDocument(object){
        if(typeof object != "object"){
            throw new Error("El tipo de dato tiene que ser de tipo 'OBJECT'");
        }

        const document = new this.colection(object);
        document.save();
        return document;
    }

    async findDocumentAndUpdate(filter, object){
        if(typeof filter != "object" || typeof object != "object"){
            throw new Error("El tipo de dato tiene que ser de tipo 'OBJECT'");
        }

        const document = await this.colection.findOneAndUpdate(filter, {$set: object}, { new: true }, (err, obj) => {
            if( err ){
                return new Error(err);
            }
    
            if(!obj){
                return new Error("No se encontro el carrito del usuario");
            }    
            return document
        })
        return document
    }
}

module.exports = ContenedorMongo;