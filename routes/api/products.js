const { Router } = require("express");
const { check } = require("express-validator");

const { getProductsByCategory, newProduct, getProductsBySubCategory, getProducts } = require("../../controllers/api/products");
const validateCategory = require("../../middlewares/validateCategory");
const validateSubCategory = require("../../middlewares/validateSubCategory");
const { validateBody } = require("../../middlewares/validateBody");

const router = Router();

router.get( "/", getProducts );

router.get( "/:category", getProductsByCategory );

router.get( "/:category/:subcategory", getProductsBySubCategory );

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

module.exports = router;

