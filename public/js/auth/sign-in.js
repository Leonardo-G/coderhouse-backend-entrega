const form = document.querySelector("#form");
const errorDiv = document.querySelector("#error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form["username"].value;
    const email = form["email"].value;
    const password = form["password"].value;
    const password_repeat = form["password_repeat"].value;
    
    try {
        const res  = await fetch("http://localhost:8000/api/auth/sign-in-create", {
            method: "POST",
            body: JSON.stringify({ email, password, username, password_repeat }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        const resp = await res.json();
        if( res.status >= 400 && res.status < 500){
            throw (JSON.stringify(resp));
        }

        //Crear el carrito que sera para el usuario registrado
        const cartUser = await fetch("http://localhost:8000/api/cart/", {
            method: "POST",
            headers: {
                "auth-token": resp.token
            }
        })
        console.log(cartUser)

        window.location.href = "/";
        
    } catch (err) {

        if(errorDiv.firstChild){
            errorDiv.firstChild.remove();
        }

        const error = JSON.parse(err);
        const pError = document.createElement("p")
        pError.textContent = error.msg;
        pError.classList.add("red");
        errorDiv.style.display = "block";
        
        errorDiv.appendChild(pError);
    }
})