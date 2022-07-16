const btnModify = document.querySelector(".btn--modify");
let btnSave = document.querySelector(".btn--save");

btnModify.addEventListener("click", (e) => {
    const infoUser = document.querySelectorAll(".account--info span")
    e.target.textContent = "Guarda Datos"
    e.target.classList.remove("btn--modify")
    e.target.classList.add("btn--save")

    infoUser.forEach( i => {
        const input = document.createElement("input");
        const name = i.getAttribute("data-name")
        
        input.setAttribute("type", "text"),
        input.setAttribute("value", i.textContent)
        input.setAttribute("name", name)

        i.replaceWith(input)
    })

    btnSave = document.querySelector(".btn--save");
    btnSave.addEventListener("click", updateProfile)
})

const updateProfile = async (e) => {

    const cookie_token = JSON.parse(decodeURIComponent(document.cookie).split("auth=j:")[1]).token
    const username = document.querySelector("input[name='username']").value
    const email = document.querySelector("input[name='email']").value
    
    const respuesta = await fetch("http://localhost:8000/api/auth/profile", {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "auth-token": cookie_token
        },
        body: JSON.stringify({
            username, email
        })
    })

    await respuesta.json();

    window.location.href = "/profile"
}