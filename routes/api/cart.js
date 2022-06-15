const { Router } = require("express");
const { check } = require("express-validator");
const { createCart, getCart, updateCart, clearCart } = require("../../controllers/api/cart");
const { validateBody } = require("../../middlewares/validateBody");
const validateJWT = require("../../middlewares/validateJWT");

const router = Router();

//Se requiere pasarle el TOKEN, para obtener el cart del usuario
router.get( "/", [
    validateJWT
], getCart );

//Ruta para crear un nuevo carrito para el usuario
router.post( "/", [
    validateJWT
], createCart )

//Agregar, modificar producto del carrito
router.put( "/modify", [
    check("productsCart", "Se necesita un array con productos en el campo 'productsCart'").isArray().notEmpty(),
    check("productsCart.*.idProduct", "el campo idProduct Tiene que ser un ID válido de Mongo").notEmpty().isMongoId(),
    check("productsCart.*.quantity", "Se necesita indicar la cantidad en 'quantity'").notEmpty().isNumeric().withMessage("El campo 'quantity', tiene que ser un dato númerico"),
    validateBody,
    validateJWT
], updateCart );

//Reiniciar el carrito
router.put( "/empty", [
    validateJWT
], clearCart )

module.exports = router;