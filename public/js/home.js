const form = document.querySelector(".form");
console.log(document.cookie);

form.addEventListener("click", ( e ) => {
    e.preventDefault();
    
    window.location = "/subcategories/herramientas"
})