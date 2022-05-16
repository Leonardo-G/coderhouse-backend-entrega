const { Router } = require("express");

const router = Router();

router.get( "/", ( req, res ) => {
    res.render("home")
})

router.get( "/category/:subcategories", ( req, res ) => {
    res.render("subcategories");
})

router.get( "/products/:subcategory", ( req, res ) => {
    res.render("products")
})

router.get( "/product/:id", ( req, res ) => {
    res.render("product");
})


module.exports = router;