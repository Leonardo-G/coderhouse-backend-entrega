const socket = io();
const mensajesDiv = document.querySelector(".mensajes");
const boton = document.querySelector("button");
const token = JSON.parse(decodeURIComponent(document.cookie).split("auth=j:")[1]).token;

document.addEventListener("DOMContentLoaded", () => {

})

socket.on("connect", () => {
    // console.log("conectado")
    
})

boton.addEventListener("click", () => {
    const mensaje = document.querySelector("#mensaje").value;
    
    socket.emit("chatGeneral", {token, mensaje: mensaje, fecha: Date.now()});
})

socket.on("mensaje-recibido", (mensaje) => {
    console.log(mensaje)
    mensajesDiv.innerHTML += `
        <p> ${mensaje.mensaje} </p>
    `
})

console.log(token)
