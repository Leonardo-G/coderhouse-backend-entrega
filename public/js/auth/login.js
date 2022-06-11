const form = document.querySelector("#form");
const errorDiv = document.querySelector("#error");

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = form["email"].value;
    const password = form["password"].value;
    console.log(email)
    try {
        const res  = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        const resp = await res.json();
        if( res.status >= 400 && res.status < 500){
            throw (JSON.stringify(resp));
        }

        window.location.href = "/"
        
    } catch (err) {

        if(errorDiv.firstChild){
            errorDiv.firstChild.remove();
        }
        const error = JSON.parse(err);
        console.log(error)
        const pError = document.createElement("p")
        pError.textContent = error.msg;
        pError.classList.add("red")
        errorDiv.style.display = "block"
        
        errorDiv.appendChild(pError);
    }
})