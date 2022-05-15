
document.addEventListener("DOMContentLoaded", () => {
    getSubCategory();
})

const getSubCategory = async () => {
    const pathSubCategory = window.location.href.split("/");
    const subCategory = pathSubCategory[pathSubCategory.length - 1]; 
console.log(pathSubCategory)
    try {
        const res = await fetch(`http://localhost:8000/api/products/subcategory/${subCategory}`, {
            method: "GET",
        })
        const resp = await res.json();
        console.log(resp)
    } catch (error) {
        console.log(error);
    }
}
