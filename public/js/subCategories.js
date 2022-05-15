const url = window.location.href;
const urlSplit = url.split("/");
const category = urlSplit[urlSplit.length - 1];

document.addEventListener("DOMContentLoaded", () => {
    getSubCategory();
})

const getSubCategory = async () => {
    try {
        const res = await fetch(`http://localhost:8000/api/categories/${category}/subcategories`, {
            method: "GET",
        })
        const resp = await res.json();
        console.log(resp);
    } catch (error) {
        console.log(error);
    }
}

