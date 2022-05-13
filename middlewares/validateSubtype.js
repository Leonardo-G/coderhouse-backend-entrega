const validateSubtype = ( req, res, next ) => {

    let subtypeValidate = []

    switch (req.body.type) {
        case "Tecnologia":
            subtype = [ "Celulares y Smartphones", "Accesorios para los celulares"]
            break;
        case "Herramientas":
            subtype = [ "Electricas", "Manual" ];
        default:
            return res.status(401).json({
                msg: "No existe ese TYPE"
            })
    }

}

module.exports = validateSubtype;