const { Router } = require("express");
const { check } = require("express-validator");
const { createCart, getCart } = require("../../controllers/api/cart");
const { validateBody } = require("../../middlewares/validateBody");

const router = Router();

router.get( "/", [
    check("id", "Se necesita un id para obtener el Cart").notEmpty(),
    validateBody,
])

router.get( "/:id", [
    check("id", "Se requiere un ID valido").isMongoId(),
    validateBody
],getCart );

router.post( "/", createCart );

module.exports = router;