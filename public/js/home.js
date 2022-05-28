const form = document.querySelector(".form");
const navCategories = document.querySelector("#category");

document.addEventListener("DOMContentLoaded", () => {
    getCategories();
    getProducts();
})

const getCategories = async ( ) => {
    const res = await fetch(`http://localhost:8000/api/category`);
    const resp = await res.json();

    resp.forEach( category => {
        navCategories.innerHTML += `
            <a>${ category.category }</a>
        `
    })
    console.log(resp);
}

const getProducts = async () => {
    const products = document.querySelector(".flex-item");

    const res = await fetch(`http://localhost:8000/api/products`);
    const resp = await res.json();
    console.log(resp)

    resp.products.forEach( product => {
        products.innerHTML += `
            <a href="/" class='item'>
                <div>
                    <img src= ${ product.imgProduct } class="img-item"/>
                </div>
                <div class='item__info'>
                    <div class='info-numero'>
                        <p class='info-precio'> $ ${product.price} </p>
                        <p class='info-descuento'>40% OFF</p>
                    </div>
                    <p class='item-cuotas'>6x $ 999.83 sin interés</p>
                    <div class='item-envio'>
                        <p>Envío gratis </p>
                        // <FontAwesomeIcon class='icon-full' icon={ faBolt }/>
                        <p class='envio-full'>FULL</p>
                    </div>
                    <p class='titulo-hover'> ${ product.title }</p>
                </div>
                <div class='icon-fav'>
                    <i class="far fa-heart"></i>
                </div>
            </a>
        `
    })
}