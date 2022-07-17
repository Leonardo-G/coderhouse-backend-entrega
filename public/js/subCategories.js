const url = window.location.href;
const urlSplit = url.split("/");
const category = urlSplit[urlSplit.length - 2];

var subCategories;

document.addEventListener("DOMContentLoaded", () => {
    getSubCategory();
})

const getSubCategory = async () => {

    const cajaSubCategorie = document.querySelector(".subcategories");

    try {
        const res = await fetch(`http://localhost:8000/api/category/${category}/subcategories`, {
            method: "GET",
        })
        const resp = await res.json();
        console.log(resp)
        resp.forEach( subCategory => {
            cajaSubCategorie.innerHTML += `
                <a href='/products/${ subCategory.subCategory }' class="subcategories__card">
                    <div>
                        <img src=${ subCategory.imgSubCategory } alt=${ subCategory.subCategory }/>
                    </div>
                    <div class="card--title">
                        <p>${ subCategory.subCategory }</p>
                    </div>
                </a>
            `
        })
    } catch (error) {
        console.log(error);
    }
}

