class ProductDTO{
    constructor({ _v, ...obj }){
        this.obj = {
            priceFormat: Number(obj._doc.price).toLocaleString("es-AR"),
            ...obj._doc
        }
    }
}

module.exports = ProductDTO;