const { Router } = require("express");
const { check } = require("express-validator");

const { createUser, loginUser, signOffUser } = require("../../controllers/api/auth");
const { validateBody } = require("../../middlewares/validateBody");

const router = Router();

router.post( "/login", loginUser );

router.post( "/sign-in-create", [
    check("email", "No es un email válido").isEmail(),
    validateBody
], createUser );

router.post( "/sign-off", signOffUser );


module.exports = router;