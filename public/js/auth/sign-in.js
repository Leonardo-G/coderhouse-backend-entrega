const form = document.querySelector("#form");
const errorDiv = document.querySelector("#error");
const spinner = document.querySelector("#spinner");

form.addEventListener("submit", async (e) => {

    spinner.classList.toggle("hidden");

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
        await Promise.all([
            fetch("http://localhost:8000/api/cart/", {
                method: "POST",
                headers: {
                    "auth-token": resp.token
                }
            }),
            fetch("http://localhost:8000/api/favorite/", {
                method: "POST",
                headers: {
                    "auth-token": resp.token
                }
            })
        ])
        window.location.href = "/";
        
    } catch (err) {
        spinner.classList.toggle("hidden");
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