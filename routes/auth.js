const { Router } = require("express");
const { signInVista, createUser, loginVista, loginUser, signOffUser } = require("../controllers/auth");
const { authSession } = require("../middlewares/sessions");

const router = Router();

router.get( "/login", [authSession], loginVista );
router.post( "/login", loginUser );

router.get( "/sign-in", [authSession], signInVista );
router.post( "/sign-in-create", createUser );

router.post( "/sign-off", signOffUser )

router.get( "../home", ( req, res ) => {
    res.render("home");
})

module.exports = router;