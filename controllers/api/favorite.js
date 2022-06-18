const { request, response } = require("express");
const { Types } = require("mongoose");
const FavoriteDAO = require("../../service/DAO/FavoriteDAO");
const Favorite = new FavoriteDAO();


const getfavorite = async ( req = request, res = response ) => {
    //Proviene de la validacion del token
    const idUser = req.id;

    const favorite = await Favorite.findOneDocument({favUser: idUser});

    return res.status(200).json(favorite);
}

const createFavorite = async ( req = request, res = response ) => {
    //Proviene de la validacion del token
    const idUser = req.id;

    await Favorite.createDocument({ favUser: idUser, favorites: []})

    return res.status(201).json({
        msg: "Schema creado"
    })
}

const updateFavorite = async ( req = request, res = response) => {
    const idUser = req.id;
    const { id } = req.params

    let favorite = await Favorite.findOneDocument({ favUser: idUser });

    if(favorite.prodFavorites.includes(id)){
        favorite = favorite.prodFavorites.filter( fav => fav != id );
    }else {
        favorite = [...favorite.prodFavorites, Types.ObjectId(id)];
    }
    
    await Favorite.findDocumentAndUpdate({favUser: idUser}, {prodFavorites: favorite});

    return res.status(201).json({
        msg: "Favoritos actualizado"
    })
}

module.exports = {
    getfavorite,
    createFavorite,
    updateFavorite
}