document.addEventListener("DOMContentLoaded", () => {
    getSubCategory();
})

const getSubCategory = async () => {
    const pathSubCategory = window.location.href.split("/");
    const subCategory = pathSubCategory[pathSubCategory.length - 1]; 
    const divBoxProduct = document.querySelector(".product");
    try {
        const res = await fetch(`http://localhost:8000/api/products/subcategory/${subCategory}`, {
            method: "GET",
        })
        const resp = await res.json();
        resp.products.forEach( product => {
            divBoxProduct.innerHTML += `
                <div class="product__card">
                    <div class="card--img">
                        <a href="/product/${ product._id }">
                            <img src=${ product.imgProduct[0] } alt=${ product.title }/>
                        </a>
                    </div>
                    <div class="card--info">
                        <a href="/product/${ product._id }">
                            <h2 class="title">
                                ${ product.title }
                            </h2>
                        </a>
                        <a href="/product/${ product._id }">
                            <p class="price">
                                $ ${ Number(product.typePrice.current).toLocaleString('es-AR') }
                            </p>
                        </a>
                    </div>
                </div>
            ` 
        })
    } catch (error) {
        console.log(error);
    }
}
