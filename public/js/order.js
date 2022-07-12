const error_input = document.querySelector("#error-input");
const windowCheck = document.querySelector(".check");

const newOrder = async () => {
    const cookie_token = JSON.parse(decodeURIComponent(document.cookie).split("auth=j:")[1]).token;
    
    let products = [];
    const address = document.querySelector("input[name='address']").value
    const totalPrice = Number(document.querySelector("#total-price").getAttribute("data-price"));
    const productsElement = document.querySelectorAll("#product-order");
    
    productsElement.forEach( p => {
        products.push(JSON.parse(p.getAttribute("data-product")))
    })

    if(!cookie_token){
        return window.location.href = "/auth/login"
    }

    if( address === ""){
        error_input.textContent = "Se necesita completar el campo"
        error_input.style.color = "red"
        error_input.style.marginTop = "1rem"
        error_input.style.fontSize = "1.4rem"
        return console.log("ERROR")
    }
    
    const respuesta = await fetch("http://localhost:8000/api/order/new", {
        method: "POST",
        headers: {
            "auth-token": cookie_token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            address,
            totalPrice,
            products
        })
    })

    const resultado = await respuesta.json();
    console.log(resultado)

    await fetch("http://localhost:8000/api/cart/empty", {
        method: "PUT",
        headers: {
            "auth-token": cookie_token
        }
    }) 

    windowCheck.style.display = "inherit"

    setTimeout(() => {
        window.location.href = "/"
    }, 3000)
    
}  