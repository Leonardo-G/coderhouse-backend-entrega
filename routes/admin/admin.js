const { Router } = require("express");
const { check } = require("express-validator");
const { newCategory, addImgSubCategory } = require("../../controllers/admin/admin");
const validateCategory = require("../../middlewares/validateCategory");
const { validateBody } = require("../../middlewares/validateBody");
const validateSubCategory = require("../../middlewares/validateSubCategory");

const router = Router();

router.post( "/category", [
    check("category", "Se requiere el campo 'category'").notEmpty(),
    check("subCategory", "Se requiere el campo 'subCategory'").notEmpty().isArray(),
    validateBody,
], newCategory );

router.post( "/subcategory", [
    check("subCategory", "Se requiere la 'subCategory'").notEmpty(),
    check("category", "Se require una 'category").notEmpty(),
    validateBody,
    validateCategory,
    validateSubCategory
], addImgSubCategory )


module.exports = router;    