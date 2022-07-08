const buttonDelete = document.querySelector("#delete-cart");
const priceProduct = document.querySelectorAll("#priceProduct");
console.log(buttonDelete.getAttribute("data-id"))
buttonDelete.addEventListener( "click", async () => {
    const idProduct = buttonDelete.getAttribute("data-id");
    
    const cookie_token = JSON.parse(decodeURIComponent(document.cookie).split("auth=j:")[1]).token;
    
    const respuesta = await fetch("http://localhost:8000/api/cart/modify", {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "auth-token": cookie_token,
        },
        body: JSON.stringify({
            idProduct,
            quantity: 0
        })
    })

    await respuesta.json();
    buttonDelete.parentElement.parentElement.parentElement.remove()
})