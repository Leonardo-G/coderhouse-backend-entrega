const { Router } = require("express");
const { signInVista } = require("../controllers/auth");

const router = Router();

router.get( "/sign-in", signInVista );

module.exports = router;