const url = window.location.href;
const urlSplit = url.split("/");
const category = urlSplit[urlSplit.length - 1];

var subCategories;

document.addEventListener("DOMContentLoaded", () => {
    getSubCategory();
})

const getSubCategory = async () => {

    const cajaSubCategorie = document.querySelector(".subcategories");

    try {
        const res = await fetch(`http://localhost:8000/api/categories/${category}/subcategories`, {
            method: "GET",
        })
        const resp = await res.json();

        resp.forEach( subCategory => {
            cajaSubCategorie.innerHTML += `
                <a href='/category/${ subCategory.category }' class="subcategories__card">
                    <div>
                        <img src=${ subCategory.imgSubCategory } alt=${ subCategory }/>
                    </div>
                    <div class="card--title">
                        <p>${ subCategory.subCategory }</p>
                    </div>
                </a>
            `
        })
        // const htmlCardSubCategorie = `
        //     <div class="subcategories__card">
        //         <div> 
        //             img(src=`${enlace}/img/images.jpg`, alt="Logo Mercado Libre")
        //         </div>
        //         <div class="card--title">
        //             <p> Electricas </p>
        //         </div>
        //     </div>
        //         `
                console.log(resp);
    } catch (error) {
        console.log(error);
    }
}

