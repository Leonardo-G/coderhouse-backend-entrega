const jwt = require("jsonwebtoken");
const Mensaje = require("./models/Mensajes");

const socketFunctions = (io) => {
    io.on("connection", async ( socket ) => {

        const mensajesBase = await Mensaje.find({sala: "general"}).populate("usuario", [ "username", "email" ])
        console.log(mensajesBase);
        socket.emit( "mensajes-base", mensajesBase )


        socket.on( "chatGeneral", (mensajeUser) => {
            jwt.verify(mensajeUser.token, process.env.SECRET_JWT, async (err, decoded) => {
                if(err){
                   return console.log(err);
                }

                const mensaje = new Mensaje({userId: decoded.id, tipo: 'chat', mensaje: mensajeUser.mensaje, fecha: mensajeUser.fecha})
                await mensaje.save();

                io.sockets.emit("mensaje-recibido", {userId: decoded.id, tipo: 'chat', mensaje: mensajeUser.mensaje, fecha: mensajeUser.fecha});
                    
            })
        })
    })
}

module.exports = socketFunctions;