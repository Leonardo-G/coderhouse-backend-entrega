const formulario = document.querySelector("#formulario");
const categoryOption = document.querySelector("#select-category");
const subCategoryOption = document.querySelector("#select-subcategory");
const buttonAddCharacteristics = document.querySelector(".icon--add");
const inputCharacteristics = document.querySelector(".campo--2");

formulario.addEventListener("submit", async ( e ) => {
    e.preventDefault();
    
    const imagen = document.querySelector("input[name='imgProduct']").files[0];
    const imgProduct = new FormData();

    imgProduct.append("imgProduct", imagen)
    
    const respuestaIMG = await fetch("http://localhost:8000/api/image/product", {
        method: "POST",
        body: imgProduct
    })

    const { imgUrl } = await respuestaIMG.json();
    let characteristics = [];
    const title = document.querySelector("input[name='title']").value;
    const category = document.querySelector("select[name='category']").value;
    const subCategory = document.querySelector("select[name='subCategory']").value;
    const delivery = document.querySelector("select[name='delivery']").value;
    const characteristicsElement = document.querySelectorAll("input[name='characteristics']")
    const current = document.querySelector("input[name='current']").value;
    const old = document.querySelector("input[name='old']").value;
    const description = document.querySelector("textarea[name='description']").value;
    const stock = document.querySelector("input[name='stock']").value;
    const cookie_token = JSON.parse(decodeURIComponent(document.cookie).split("auth=j:")[1]).token;
    
    if(!cookie_token){
        window.location.href = "/auth/login"
    }

    characteristicsElement.forEach( c => {
        characteristics.push(c.value)
    })
    console.log(characteristics)
    const respuestaPRODUCT = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": cookie_token
        },
        body: JSON.stringify({
            title,
            imgProduct: imgUrl,
            category,
            subCategory,
            typePrice: {
                current: Number(current),
                old: old === "" ? 0 : Number(old)
            },
            characteristics,
            stock: Number(stock),
            description,
            delivery: Number(delivery)
        })
    })
    const resultadoPRODUCT = await respuestaPRODUCT.json();
    
    window.location.href = `/product/${ resultadoPRODUCT._id }`
})

categoryOption.addEventListener("change", (e) => {

    while( subCategoryOption.firstChild ){
        subCategoryOption.firstChild.remove()
    }

    if( e.target.value === "herramientas" ){
        subCategoryOption.innerHTML = `
            <option value="electricas">Eléctricas</option>
            <option value="manuales">Manuales</option>
            <option value="jardin">Jardín</option>
            <option value="accesorios">Accesorios</option>
        `
    }

    if( e.target.value === "construccion" ){
        subCategoryOption.innerHTML = `
            <option value="griferias">Griferías</option>
            <option value="pinturas">Pinturas</option>
            <option value="pisos y revestimientos">Pisos y revestimientos</option>
            <option value="electricidad">Electricidad</option>
            <option value="plomeria">Plomería</option>
        `
    }
})

buttonAddCharacteristics.addEventListener("click", () => {
    const characteristic = document.createElement("input");
    characteristic.type = "text";
    characteristic.name = "characteristics";
    characteristic.placeholder = "Agregue una catacteristica";

    inputCharacteristics.appendChild(characteristic);
})