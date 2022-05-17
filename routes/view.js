const { Router } = require("express");

const router = Router();

router.get( "/", ( req, res ) => {
    const user = req.session.user;
    
    res.render("home", { user })
})

router.get( "/category/:subcategories", ( req, res ) => {
    const user = req.session.user;

    res.render("subcategories", { user });
})

router.get( "/products/:subcategory", ( req, res ) => {
    const user = req.session.user;

    res.render("products", { user })
})

router.get( "/product/:id", ( req, res ) => {
    const user = req.session.user;
    
    res.render("product", { user });
})


module.exports = router;