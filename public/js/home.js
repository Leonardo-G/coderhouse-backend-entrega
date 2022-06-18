const iconFavDiv = document.querySelectorAll("#icon-fav");

const addFavorite = async (icon) => {
    const cookie = decodeURIComponent(document.cookie).split("auth=j:")
    console.log(icon);
    if(cookie.length <= 1){
        return window.location.href = "/auth/login";
    }

    const token = JSON.parse(cookie[1]).token;
    const productID = icon.getAttribute("data-product-id");

    const res = await fetch( `http://localhost:8000/api/favorite/${productID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        }
    } )

    const resp = await res.json();
    console.log(resp);

    icon.classList.toggle("icon--favOn")
    icon.children[0].classList.toggle("fa-solid");
}

iconFavDiv.forEach( icon => {
    icon.addEventListener( "click", () => addFavorite(icon) )
})
