const { Router } = require("express");
const { newOrder } = require("../../controllers/api/order");
const validateJWT = require("../../middlewares/validateJWT");

const router = Router();

router.post("/new", validateJWT, newOrder)

module.exports = router;