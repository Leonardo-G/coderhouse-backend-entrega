const { Router } = require("express");
const { newImage } = require("../../controllers/api/image");

const router = Router();

router.post( "/product", newImage );   

module.exports = router;