const { request, response } = require("express");
const OrderDao = require("../../service/DAO/OrderDAO");
const Order = new OrderDao();

const newOrder = async ( req = request, res = response ) => {
    const { address, totalPrice, products } = req.body;

    try {
        const order = await Order.createDocument({ user: req.id, address, totalPrice, products })
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

const getOrder = async ( req = request, res = response ) => {
    const order = await Order.findDocuments({user: req.id}, { skip: 0, limit: 5}, { ref: "products.idProduct", key: ["title", "imgProduct", "typePrice", "stock"]})

    res.status(200).json(order);
}

module.exports = {
    newOrder,
    getOrder
}