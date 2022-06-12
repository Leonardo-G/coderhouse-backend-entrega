const { Router } = require("express");
const { getSubCategories, getCategories } = require("../../controllers/api/category");

const router = Router();

router.get( "/", getCategories );

router.get( "/:category/subcategories", getSubCategories);

module.exports = router;