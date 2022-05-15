const { Router } = require("express");

const router = Router();

router.get( "/", ( req, res ) => {
    res.render("home")
})

router.get( "/subcategories/:subcategories", ( req, res ) => {
    res.render("subcategories");
})


module.exports = router;