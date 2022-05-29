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
        
        const characteristics = resp.characteristics;
        divBoxProduct.innerHTML += `
            <div class="product__galery">
                <img src=${ resp.imgProduct[0] } />
            </div>
            <div class="product__img">
                <img src=${ resp.imgProduct[0] } />
            </div>
            <div class="product__info">
                <h1>${ resp.title }</h1>
                <p class="price">$ ${ Number(resp.price).toLocaleString("es-AR") }</p>
                    <span class="cuota">en 12x $ ${ (Number(resp.price) / 12).toLocaleString("es-AR", { maximumFractionDigits: "2", minimumFractionDigits: "2" }) }</span>
                <p class="">Ver los medios de pago</p>    
                <div class="characteristics">
                    <p class="characteristics__title">Lo que tenes que saber de este producto</p>
                    <ul>
                        ${ characteristics.map( c => `<li>${ c }</li>`).join("") }
                    </ul>
                </div>
            </div>
        `
    } catch (error) {
        console.log(error);
    }
}