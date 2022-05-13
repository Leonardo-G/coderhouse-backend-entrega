const validateAdmin = ( req, res, next ) => {
    if( !req.body.admin ){
        return res.status(401).json({
            msg: "Se necesita ser administrador para realizar dicha acción"
        })
    }

    next();
}