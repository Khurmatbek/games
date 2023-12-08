// const productTemplate = document.querySelector(".product__tempalte").content;
const token = JSON.parse(localStorage.getItem("token") || "false")
console.log(token)
const buyButton = document.querySelector(".sale__buy");
buyButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!token) {
        console.log("salom")
        window.location.href = "login.html"
    }
})