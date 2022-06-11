const { response } = require("express");
const { request } = require("express");
const { Router } = require("express");
const instanceFunction = require("../helpers/configAxios");

const router = Router();

router.get( "/auth/sign-in", ( req = request, res = response ) => {

    const token = req.cookies?.auth;
    if(token){
        res.redirect("/");
    }else{
        instanceFunction().post("/api/auth/sign-in")
            .then( resp => {
                console.log(resp.json());
            })
            .catch( err => console.log(err))

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
    
    res.render("home", { user });
})

router.get( "/category/:subcategories", ( req, res ) => {
    const user = req.cookies.auth;

    res.render("subcategories", { user });
})

router.get( "/products/:subcategory", ( req, res ) => {
    const user = req.cookies?.auth;
    console.log(user)
    res.render("products", { user })
})

router.get( "/product/:id", ( req, res ) => {
    const user = req.cookies?.auth;

    instanceFunction().get("/api/products/product/627f26a7f17b38028ead80e6")
    .then( r => {
        const resp = r.data;
        console.log("Funciona la API");
    })
    .catch( err => console.log("No funciona la API", err))

    res.render("product", { user });
})

router.get( "/chat", ( req, res ) => {
    const user = req.cookies?.auth;
    if(!user){
        return res.redirect("/auth/login");
    }
    res.render("chat", { user });
})


module.exports = router;