const form = document.querySelector(".form");

form.addEventListener("click", ( e ) => {
    e.preventDefault();
    
    const img = document.querySelector("#myFile").files;    
    const data = new FormData();
    data.append("imgSubCategory", img[0]);
    data.append("category", "Herramientas");
    console.log(data)
    console.log(img);

    fetch("http://localhost:8000/api/admin/subcategory",{
        method: "POST",
        body: data
    })
        .then( resp => console.log(resp));
})