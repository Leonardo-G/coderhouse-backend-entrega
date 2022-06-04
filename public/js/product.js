document.addEventListener("DOMContentLoaded", () => {
    getSubCategory();
})

const getSubCategory = async () => {
    const pathProduct = window.location.href.split("/");
    const product = pathProduct[pathProduct.length - 1]; 
    const divBoxProduct = document.querySelector(".product");
    const divPayment = document.querySelector(".payment");
    try {
        const res = await fetch(`http://localhost:8000/api/products/product/${product}`, {
            method: "GET",
        })
        const resp = await res.json();
        console.log(resp);
        const characteristics = resp.characteristics;
        const noBlock = "<p style={display: none}></p>"
        divBoxProduct.innerHTML += `
            <div class="product__galery">
                <img src=${ resp.imgProduct[0] } />
            </div>
            <div class="product__img">
                <img src=${ resp.imgProduct[0] } />
            </div>
            <div class="product__info">
                <div class="info--head">
                    <span class="sold">Nuevo  |  ${ resp.sold } vendidos</span>
                    <i class="fa-regular fa-heart icon--fav"></i>
                </div>
                <h1>${ resp.title }</h1>
                ${ resp.typePrice.old !== 0 ? `<p class="price--old">$ ${resp.typePrice.old.toLocaleString("es-AR")} </p>` : noBlock}
                
                <p class="price">$ ${ resp.typePrice.current.toLocaleString("es-AR") } <span class="descuento"> ${ resp.typePrice.old !== 0 && Math.round((resp.typePrice.old - resp.typePrice.current) / (resp.typePrice.old / 100))  }% OFF</span></p>
                <span class="cuota">en 12x $ ${ (resp.typePrice.current / 12).toLocaleString("es-AR", { maximumFractionDigits: "2", minimumFractionDigits: "2" }) } sin interés</span>
                <p class="">Ver los medios de pago</p>    
                <div class="characteristics">
                    <p class="characteristics__title">Lo que tenes que saber de este producto</p>
                    <ul>
                        ${ characteristics.map( c => `<li>${ c }</li>`).join("") }
                    </ul>
                </div>
            </div>
        `;
        divPayment.innerHTML += `
            <div class="payment__delivery">
                <i class="fa-solid fa-truck-fast icon--thunk"></i>
                <p>Llega gratis <span>${ dayDelivery(resp.delivery) === "mañana" ? "mañana" : `el ${dayDelivery(resp.delivery)}`}</span></p>    
            </div>
            ${ resp.stock > 0 ? "<p class='stock_true'>Stock disponible</p>" : noBlock }   
            ${
                resp.stock > 0
                ? 
                    `<div class="payment__select">
                        <p>Cantidad: </p>
                        <input type="number" name="cantidad" value="1"/>
                        <p>unidad/es</p>
                        <p class="stock">(${ resp.stock } disponibles)</p>
                    </div>`
                    
                : noBlock
            }
            <button class="payment__button button--buy">Comprar ahora</button>
            <button class="payment__button button--add" onClick='addProduct()'>Agregar al carrito</button>
            <div class="payment_info">
                <div class="info--p">
                    <i class="fa-solid fa-share"></i>
                    <p><span>Devolución gratis.</span> Tenés 30 dias desde que lo recibís</p>
                </div>
                <div class="info--p">
                    <i class="fa-regular fa-circle-check"></i>
                    <p><span>Compra protegida.</span> recibrí el producto que esperabas o e devolvemos tu dinero.</p>
                </div>
                <div class="info--p">
                    <i class="fa-solid fa-award"></i>
                    <p>12 meses de garantía de fábrica.</p>
                </div>
            </div>
        `;

        document.title = resp.title;
    } catch (error) {
        console.log(error);
    }
}

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

const addProduct = async () => {
    let cookie = (decodeURIComponent(document.cookie).split("auth=j:")[1])
    if(!cookie){
        window.location.href = "/auth/login";
    }
    console.log(cookie)
    cookie = JSON.parse(cookie).token;
    console.log(cookie);

    // const res = fetch("http://localhost:8000/api/cart", {

    // })

}