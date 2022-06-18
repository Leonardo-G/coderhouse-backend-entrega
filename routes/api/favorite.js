const { Router } = require("express");
const { getfavorite, createFavorite, updateFavorite } = require("../../controllers/api/favorite");
const validateJWT = require("../../middlewares/validateJWT");

const router = Router()

router.get( "/", validateJWT, getfavorite );

router.post( "/", validateJWT, createFavorite );

router.put( "/:id", validateJWT, updateFavorite );

module.exports = router;