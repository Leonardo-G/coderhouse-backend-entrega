const { Router } = require("express");
const { signInVista, createUser, loginVista, loginUser, signOffUser } = require("../../controllers/api/auth");

const router = Router();

router.post( "/login", loginUser );

router.post( "/sign-in-create", createUser );

router.post( "/sign-off", signOffUser );


module.exports = router;