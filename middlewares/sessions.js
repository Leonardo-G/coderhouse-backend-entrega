const authSession = ( req, res, next ) => {
    if( req.session.user?.isLogged === true ){
        return res.redirect("/home");
    }

    return next();
    
}

module.exports = {
    authSession
}