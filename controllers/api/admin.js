const Category = require("../../models/Category");

const newCategory = async ( req = request, res = response ) => {
    if( !req.body.admin ){
        return res.status(401).json({
                msg: "No permitido. No eres un administrador"
            })
    }

    const category = new Category({ category: req.body.category })

    await category.save();

    res.status(201).json({
        msg: "Categoria creada"
    })
}

module.exports = {
    newCategory,
}