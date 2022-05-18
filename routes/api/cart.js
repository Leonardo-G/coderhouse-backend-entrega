const { Router } = require("express");
const { check } = require("express-validator");
const { createCart, getCart, updateCart, clearCart } = require("../../controllers/api/cart");
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

//Ruta para crear un nuevo carrito para el usuario
router.post( "/:id", [
    check("cartUser", "Se necesita un idMongo válido del usuario dentro del campo 'cartUser'").isMongoId(),
    validateBody
], createCart )

router.put( "/:id", [
    check( "id", "Tiene que ser un ID Mongo válido del usuario en el parametro /cart/:id").isMongoId(),
    check("cartUser", "Se necesita un idMongo válido del usuario dentro del campo 'cartUser'").isMongoId(),
    check("productsCart", "Se necesita un array con productos en el campo 'productsCart'").isArray().notEmpty(),
    check("productsCart.*.idProduct", "el campo idProduct Tiene que ser un ID válido de Mongo").notEmpty().isMongoId(),
    check("productsCart.*.quantity", "Se necesita indicar la cantidad en 'quantity'").notEmpty().isNumeric().withMessage("El campo 'quantity', tiene que ser un dato númerico"),
    validateBody
], updateCart );

//Reiniciar el carrito
router.put( "/:id/empty", [
    check( "id", "Tiene que ser un ID Mongo válido del usuario en el parametro /cart/:id/empty").isMongoId(),
    validateBody
], clearCart )

module.exports = router;