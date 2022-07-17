const { Router } = require("express");
const { check } = require("express-validator");

const { getProductsByCategory, newProduct, getProductsBySubCategory, getProducts, getProductById, updateProduct, updateAndIncrement } = require("../../controllers/api/products");
const validateCategory = require("../../middlewares/validateCategory");
const validateSubCategory = require("../../middlewares/validateSubCategory");
const { validateBody } = require("../../middlewares/validateBody");
const validateJWT = require("../../middlewares/validateJWT");

const router = Router();

router.get( "/", getProducts );

router.get( "/:category", getProductsByCategory );

router.get( "/subcategory/:subcategory", getProductsBySubCategory );

router.get( "/product/:id", getProductById );

router.post( "/", [
    check("title", "La propiedad 'title' es requerido").notEmpty(),
    check("typePrice", "La propiedad 'typePrice' es requerido").notEmpty(),
    check("category", "La propiedad 'category' es requerido").notEmpty(),
    check("subCategory", "La propiedad 'subCategory' es requerido").notEmpty(),
    check("characteristics", "La propiedad 'characteristics' es requerido y tiene que ser un 'Array'"),
    check("description", "La propiedad 'description' es requerido"),
    validateBody,
    validateCategory,
    validateSubCategory,
    validateJWT
], newProduct );

router.put( "/:id", [
    check("id", "Se necesita el id del producto"),
    validateBody,
    validateJWT
], updateProduct )

router.put( "/:id/buy", [
    check("id", "Se necesita el id del producto").isMongoId(),
    validateBody,
    validateJWT
], updateAndIncrement )

router.put( "/:id/visited", [
    check("id", "Se necesita el id del producto").isMongoId(),
    check("campo", "Ingrese el 'campo' que se requiere incrementar").notEmpty(),
    validateBody,
    validateJWT
])

module.exports = router;

