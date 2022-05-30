const jwt = require("jsonwebtoken");
const Mensaje = require("./models/Mensajes");
Mensaje.populate("usuario", [ "username", "imgUrl" ])

const socketFunctions = (io) => {
    io.on("connection", async ( socket ) => {

        const mensajesBase = await Mensaje.find({sala: "general"}).populate("usuario", [ "username", "imgUrl" ])
        socket.emit( "mensajes-base", mensajesBase );

        socket.on( "chatGeneral", (mensajeUser) => {
            const { usuario, ...cuenta } = mensajeUser;

            jwt.verify(mensajeUser.token, process.env.SECRET_JWT, async (err, decoded) => {
                if(err){
                    return done(new Error("should not happen"));
                }
                const obj = {
                    usuario: decoded.id, 
                    tipo: 'chat', 
                    mensaje: mensajeUser.mensaje, 
                    fecha: mensajeUser.fecha
                }

                let mensaje = new Mensaje(obj);
                mensaje = await mensaje.save();

                const mensajeActual = {
                    usuario: {
                        _id: mensaje.usuario,
                        ...usuario
                    },
                    fecha: mensaje.fecha,
                    sala: mensaje.sala,
                    tipo: mensaje.tipo,
                    _id: mensaje._id,
                    mensaje: mensaje.mensaje
                }

                io.sockets.emit("mensaje-recibido", mensajeActual);
                    
            })
        })
    })
}

module.exports = socketFunctions;