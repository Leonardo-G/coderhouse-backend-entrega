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

router.get( "/", async ( req, res ) => {
    const user = req.cookies?.auth;

    const [ resp1, resp2 ] = await Promise.all([
        instanceFunction().get("/api/products"),
        instanceFunction().get("api/category/herramientas/subcategories?limit=2")
    ])

    const productsAll = await resp1.data;
    const subCategories = await resp2.data;

    res.render("home", { user: user?.user, productsAll, subCategories });
})

router.get( "/category/:subcategories", ( req, res ) => {
    const user = req.cookies.auth;

    res.render("subcategories", { user });
})

router.get( "/products/:subcategory", ( req, res ) => {
    const user = req.cookies?.auth;
    
    res.render("products", { user })
})

router.get( "/product/:id", async ( req, res ) => {
    const user = req.cookies?.auth;
    const { id } = req.params;

    const respuesta = await instanceFunction().get(`/api/products/product/${id}`);
    const product = await respuesta.data;

    res.render("product", { user: user?.user, product });
})

router.get("/cart", async ( req, res ) => {
    const user = req.cookies?.auth;

    if(!user){
        return res.redirect("/auth/login");
    }

    const respuesta = await instanceFunction(user.token).get(`/api/cart/`);
    const cart = await respuesta.data;
    console.log(cart)

    res.render("cart", { user: user?.user });
})

router.get( "/chat", ( req, res ) => {
    const user = req.cookies?.auth;
    if(!user){
        return res.redirect("/auth/login");
    }
    res.render("chat", { user: user?.user });
})


module.exports = router;