const mongoose = require("mongoose");

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL_DATABASE);
        console.log("Base a MongoDB conectado");
        mongoose.connection.on('error', function(error) {
            console.error('Database connection error:', error);
          });
    } catch (error) {
        console.log("Error al conectar la base a Mongo", error);
    }
}

module.exports = connectMongo