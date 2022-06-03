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
        console.log(resp);
        const characteristics = resp.characteristics;
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
                ${ resp.typePrice.old !== 0 ? `<p class="price--old">$ ${resp.typePrice.old.toLocaleString("es-AR")} </p>` : "<p style={display: none}></p>"}
                
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
        `
    } catch (error) {
        console.log(error);
    }
}