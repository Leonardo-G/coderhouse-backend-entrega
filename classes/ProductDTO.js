class ProductDTO{
    constructor({ _v, ...obj }){
        this.obj = {
            ...obj._doc,
            typePrice: {
                ...obj._doc.typePrice,
                priceFormat: Number(obj._doc.typePrice.current).toLocaleString("es-AR"),
            }
        }
    }
}

module.exports = ProductDTO;