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

router.get( "/auth/sign-off", ( req, res ) => {
    res.clearCookie("auth").redirect("../../auth/login");
})

router.get( "/", async ( req, res ) => {
    const user = req.cookies?.auth;
    let favorite;
    
    const [ resp1, resp2 ] = await Promise.all([
        instanceFunction().get("/api/products"),
        instanceFunction().get("/api/category/herramientas/subcategories?limit=2"),
    ])

    if(user){
        try {
            const resp = await instanceFunction(user.token).get("/api/favorite");
            favorite = resp.data
            
        } catch (error) {
            console.log("Error")
        }
    }
    
    const productsAll = await resp1.data;
    const subCategories = await resp2.data;

    res.render("home", { user: user?.user, productsAll, subCategories, favorites: favorite?.prodFavorites });
})

router.get( "/:categories/subcategories", ( req, res ) => {
    const user = req.cookies?.auth;

    console.log(user)
    res.render("subcategories", { user: user?.user });
})

router.get( "/products/:subcategory", ( req, res ) => {
    const user = req.cookies?.auth;
    console.log(user)
    res.render("products", { user: user?.user })
})

router.get( "/product/:id", async ( req, res ) => {
    const user = req.cookies?.auth;
    const { id } = req.params;

    const [ resp1, resp2 ] = await Promise.all([
        instanceFunction().get(`/api/products/product/${id}`),
        instanceFunction().put(`/api/products/${ id }/visited`)
    ])

    const product = resp2.data;
    res.render("product", { user: user?.user, product });
})

router.get("/cart/:path", async ( req, res ) => {
    const user = req.cookies?.auth;
    const { path } = req.params
    
    if(!user){
        return res.redirect("/auth/login");
    }

    const [ resp1, resp2 ] = await Promise.all([
        instanceFunction(user.token).get(`/api/cart/`),
        instanceFunction(user.token).get(`/api/favorite/`)
    ])
    const cart = await resp1.data;
    const favorite = await resp2.data;
    
    res.render("cart", { user: user?.user, cart, path, favorites: favorite.prodFavorites });
})

router.get( "/chat", ( req, res ) => {
    const user = req.cookies?.auth;
    if(!user){
        return res.redirect("/auth/login");
    }
    res.render("chat", { user: user?.user });
})

router.get("/profile", async ( req, res ) => {
    const user = req.cookies?.auth;
    if(!user){
        return res.redirect("/auth/login");
    }

    const resp = await instanceFunction(user.token).get(`/api/auth/`)
    const userInfo = await resp.data

    res.render("profile", { user: userInfo });
})


router.get("/order", async ( req, res ) => {
    const user = req.cookies?.auth;
    
    if(!user){
        return res.redirect("/auth/login");
    }
    
    const respuesta = await instanceFunction(user.token).get(`/api/cart/`);
    const cart = await respuesta.data;
    
    res.render("order", { user: user?.user, cart });
})

router.get("/myorder", async ( req = request, res = response ) => {
    const user = req.cookies?.auth;
    
    if(!user){
        return res.redirect("/auth/login");
    }
    
    const respuesta = await instanceFunction(user.token).get(`/api/order/get`);
    const orders = await respuesta.data;
    console.log(orders)
    res.render("myorder", { user: user?.user, orders });
})

router.get("/newpost", async ( req = request, res = response ) => {
    const user = req.cookies?.auth;
    
    if(!user){
        return res.redirect("/auth/login");
    }
    
    res.render("newpost", { user: user?.user });
})

module.exports = router;