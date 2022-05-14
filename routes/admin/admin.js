const { Router } = require("express");
const { check } = require("express-validator");
const { newCategory, newSubcategory } = require("../../controllers/admin/admin");
const validateCategory = require("../../middlewares/validateCategory");
const { validationBody } = require("../../middlewares/validationBody");

const router = Router();

router.post( "/category", [
    check("category", "Se requiere el campo CATEGORY").notEmpty(),
    validationBody
], newCategory );

router.post( "/subcategory", [
    check("subCategory", "Se requiere la 'subCategory'").notEmpty(),
    check("category", "Se require una 'category").notEmpty(),
    validationBody,
    validateCategory
], newSubcategory )


module.exports = router;