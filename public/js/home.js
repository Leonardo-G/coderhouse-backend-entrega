const form = document.querySelector(".form");
const navCategories = document.querySelector("#category");

document.addEventListener("DOMContentLoaded", () => {
    getCategories();
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


form.addEventListener("click", ( e ) => {
})