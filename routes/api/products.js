const { Router } = require("express");
const { check } = require("express-validator");

const { getProductsByCategory, newProduct, getProductsBySubCategory, getProducts, getProductById, sendSMS, updateProduct } = require("../../controllers/api/products");
const validateCategory = require("../../middlewares/validateCategory");
const validateSubCategory = require("../../middlewares/validateSubCategory");
const { validateBody } = require("../../middlewares/validateBody");
const validateJWT = require("../../middlewares/validateJWT");

const router = Router();

router.get( "/", getProducts );

router.get( "/:category", getProductsByCategory );

router.get( "/subcategory/:subcategory", getProductsBySubCategory );

router.get( "/product/:id", getProductById );

router.post( "/tel/send", sendSMS );

router.post( "/", [
    check("title", "La propiedad 'title' es requerido").notEmpty(),
    check("price", "La propiedad 'category' es requerido").notEmpty(),
    check("category", "La propiedad 'category' es requerido").notEmpty(),
    check("subCategory", "La propiedad 'subCategory' es requerido").notEmpty(),
    check("characteristics", "La propiedad 'characteristics' es requerido y tiene que ser un 'Array'"),
    validateBody,
    validateCategory,
    validateSubCategory
], newProduct );

router.put( "/:id", [
    check("id", "Se necesita el id del producto"),
    validateBody,
    validateJWT
], updateProduct )

module.exports = router;

