const { Router } = require("express");
const { check } = require("express-validator");
const { newCategory } = require("../../controllers/api/admin");
const { validationBody } = require("../../middlewares/validationBody");
// const multer = require("multer");
// const upload = multer({ dest: 'uploads/' })

const router = Router();

router.post( "/category", [
    check("category", "Se requiere el campo CATEGORY").notEmpty(),
    validationBody
], newCategory );

router.post( "/subcategory", [
    check("subCatergory").notEmpty(),
    check("category").notEmpty(),
    
] )


module.exports = router;