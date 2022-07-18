const socket = io();
const mensajesDiv = document.querySelector(".mensajes");
const boton = document.querySelector("#mensaje__input");
const cookie = JSON.parse(decodeURIComponent(document.cookie).split("auth=j:")[1]);
const token = cookie.token;
let ultimaFecha; 

socket.on("connect", () => {
    console.log("conectado")
    
})

socket.on("mensajes-base", (mensajes) => {

    mensajes.forEach( mensaje => {
        const fecha = new Date(Number(mensaje.fecha)).toLocaleString("es-AR", { month: 'long', day: 'numeric'});
        if( ultimaFecha !== fecha ){
            ultimaFecha = fecha;
            console.log(ultimaFecha !== fecha)
            mensajesDiv.innerHTML += `<span class="ultima--fecha">${ultimaFecha}</span>`
        }

        if(mensaje.usuario._id === cookie.user.id){
            mensajesDiv.innerHTML += `
                <div class="mensaje mensaje--propio">
                    <img class="mensaje__imagen" src="${mensaje.usuario.imgUrl}"/>
                    <p class="mensaje__texto texto--propio">${mensaje.mensaje}</p>
                    <span class="mensaje__hora">${new Date(Number(mensaje.fecha)).toLocaleString("es-AR", { "hour": "numeric", "minute": "numeric" })}</span>
                </div>
            `
        }else{
            mensajesDiv.innerHTML += `
                <div class="mensaje">
                    <img class="mensaje__imagen" src="${mensaje.usuario.imgUrl}"/>
                    <div>
                        <p class="mensaje__usuario">${mensaje.usuario.username}</p>
                        <p class="mensaje__texto">${mensaje.mensaje}</p>
                    </div>
                    <span class="mensaje__hora">${new Date(Number(mensaje.fecha)).toLocaleString("es-AR", { "hour": "numeric", "minute": "numeric" })}</span>
                </div>
            `
        }

    })
})


boton.addEventListener("click", () => {
    let mensaje = document.querySelector("#mensaje").value;
    
    socket.emit("chatGeneral", {token, mensaje: mensaje, fecha: Date.now(), usuario:{ imgUrl: cookie.user.imgUrl, username: cookie.user.username }});
})

socket.on("mensaje-recibido", (mensaje) => {
        const fecha = new Date(Number(mensaje.fecha)).toLocaleString("es-AR", { month: 'long', day: 'numeric'});
        if( ultimaFecha !== fecha ){
            ultimaFecha = fecha;
            mensajesDiv.innerHTML += `<span class="ultima--fecha">${ultimaFecha}</span>`
        }

        if(mensaje.usuario._id === cookie.user.id){
            mensajesDiv.innerHTML += `
                <div class="mensaje mensaje--propio">
                    <img class="mensaje__imagen" src="${mensaje.usuario.imgUrl}"/>
                    <p class="mensaje__texto texto--propio">${mensaje.mensaje}</p>
                    <span class="mensaje__hora">${new Date(Number(mensaje.fecha)).toLocaleString("es-AR", { "hour": "numeric", "minute": "numeric" })}</span>
                </div>
            `
        }else{
            mensajesDiv.innerHTML += `
                <div class="mensaje">
                    <img class="mensaje__imagen" src="${mensaje.usuario.imgUrl}"/>
                    <div>
                        <p class="mensaje__usuario">${mensaje.usuario.username}</p>
                        <p class="mensaje__texto">${mensaje.mensaje}</p>
                    </div>
                    <span class="mensaje__hora">${new Date(Number(mensaje.fecha)).toLocaleString("es-AR", { "hour": "numeric", "minute": "numeric" })}</span>
                </div>
            `
        }
})
