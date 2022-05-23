const { response } = require("express");
const { request } = require("express");
const { Router } = require("express");

const router = Router();

router.get( "/auth/sign-in", ( req = request, res = response ) => {

    const token = req.cookies?.auth;
    if(token){
        res.redirect("/");
    }else{
        res.status(200).render("auth/sign-in");
    }
})

router.get( "/auth/login", ( req = request, res = response ) => {
    const token = req.cookies?.auth;
    if(token){
        res.redirect("/");
    }else{
        res.status(200).render("auth/login");
    }
});

router.get( "/", ( req, res ) => {
    const user = req.cookies?.auth;
    
    res.render("home", { user })
})

router.get( "/category/:subcategories", ( req, res ) => {
    const user = req.cookies.auth;

    res.render("subcategories", { user });
})

router.get( "/products/:subcategory", ( req, res ) => {
    const user = req.cookies.auth;

    res.render("products", { user })
})

router.get( "/product/:id", ( req, res ) => {
    const user = req.cookies.user;
    
    res.render("product", { user });
})


module.exports = router;