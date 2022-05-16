document.addEventListener("DOMContentLoaded", () => {
    getSubCategory();
})

const getSubCategory = async () => {
    const pathProduct = window.location.href.split("/");
    const product = pathProduct[pathProduct.length - 1]; 
    const divBoxProduct = document.querySelector(".product");
    try {
        const res = await fetch(`http://localhost:8000/api/products/product/${product}`, {
            method: "GET",
        })
        const resp = await res.json();
        
        divBoxProduct.innerHTML += `
            <div class="product__galery">
                <img src=${ resp.imgProduct[0] } />
            </div>
            <div class="product__img">
                <img src=${ resp.imgProduct[0] } />
            </div>
            <div class="product__info">
                <h1>${ resp.title }</h1>
                <p class="price">${ resp.price.toLocaleString("es-AR") }</p>
            </div>
        `
        console.log(resp)
    } catch (error) {
        console.log(error);
    }
}