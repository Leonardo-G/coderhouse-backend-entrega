const pathProduct = window.location.href.split("/");
const product = pathProduct[pathProduct.length - 1]; 
const idProduct = (window.location.href).split("product/")[1];
const buttonBuy = document.querySelector("#button-buy");

//POSIBLE DTO
const dayDelivery = (day) => {
    let deliveryDay;
    const dayNext2 = new Date().setDate(new Date().getDate() + 3);

    if( day === 1){
        deliveryDay = new Date(dayNext2).toLocaleDateString("es-AR", {weekday: 'long'});
    }
    if( day === 2 ){
        deliveryDay = "mañana";
    }
    
    return deliveryDay;
}

const redirectCart = () => window.location.href = "/cart/save"
const redirectOrder = () => window.location.href = "/order"

const addProduct = async () => {
    let cookie = (decodeURIComponent(document.cookie).split("auth=j:")[1]);
    const quantityProduct = document.querySelector(".payment__select input").value;

    if(!cookie){
        window.location.href = "/auth/login";
    }
    
    cookie = JSON.parse(cookie).token;
    try {
        const res = await fetch("http://localhost:8000/api/cart/modify", {
            method: "PUT",
            body: JSON.stringify({
                idProduct: product,
                quantity: Number(quantityProduct)
            }),
            headers: {
                "auth-token": cookie,
                "Content-Type": "application/json"
            }
        })
    
        const resp = await res.json();

        if(res.status !== 201){
            throw new Error(resp)
        }
        
    } catch (error) {
        window.location.href = "/auth/login";
        console.log(error)
    }
}

const addCart = async () => {
    await addProduct();
    redirectCart();
}

const newOrder = async () => {
    await addProduct();
    redirectOrder();
}

const description = (desc) => {
    const divDescription = document.querySelector(".description");

    divDescription.innerHTML += `
        <h2 class="descripion__title">Descripción</h2>
        <p class="pre">${ desc }</p>
    `
}