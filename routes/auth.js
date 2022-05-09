const { Router } = require("express");
const { signInVista, createUser } = require("../controllers/auth");

const router = Router();

router.get( "/sign-in", signInVista );

router.post( "/sign-in-create", createUser );

router.get( "../home", ( req, res ) => {
    res.render("home")
})

module.exports = router;