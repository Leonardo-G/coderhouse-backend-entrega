const { Router } = require("express");
const { newOrder, getOrder } = require("../../controllers/api/order");
const validateJWT = require("../../middlewares/validateJWT");

const router = Router();

router.post("/new", validateJWT, newOrder);

router.get("/get", validateJWT, getOrder);

module.exports = router;