const { Router } = require("express");
const { check } = require("express-validator");

const { createUser, loginUser, signOffUser, getInfoUser, updateUser } = require("../../controllers/api/auth");
const { validateBody } = require("../../middlewares/validateBody");
const validateJWT = require("../../middlewares/validateJWT");

const router = Router();

router.post( "/login", loginUser );

router.post( "/sign-in-create", [
    check("email", "No es un email válido").isEmail(),
    validateBody
], createUser );

router.post( "/sign-off", signOffUser )

router.get( "/", validateJWT, getInfoUser )

router.put( "/profile", validateJWT, updateUser )

module.exports = router;