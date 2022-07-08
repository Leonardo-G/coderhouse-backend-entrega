const buttonDelete = document.querySelector("#delete-cart");
const priceProduct = document.querySelectorAll("#priceProduct");

buttonDelete.addEventListener( "click", async () => {
    const idProduct = buttonDelete.getAttribute("data-id");
    
    const cookie_token = JSON.parse(decodeURIComponent(document.cookie).split("auth=j:")[1]).token;
    
    const respuesta = await fetch(`http://localhost:8000/api/favorite/${ idProduct }`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "auth-token": cookie_token,
        }
    })

    await respuesta.json();
    buttonDelete.parentElement.parentElement.parentElement.remove()
})