const { Router } = require("express");
const { check } = require("express-validator");
const { newCategory, newSubcategory } = require("../../controllers/admin/admin");
const validateCategory = require("../../middlewares/validateCategory");
const { validateBody } = require("../../middlewares/validationBody");

const router = Router();

router.post( "/category", [
    check("category", "Se requiere el campo CATEGORY").notEmpty(),
    validateBody
], newCategory );

router.post( "/subcategory", [
    check("subCategory", "Se requiere la 'subCategory'").notEmpty(),
    check("category", "Se require una 'category").notEmpty(),
    validateBody,
    validateCategory
], newSubcategory )


module.exports = router;