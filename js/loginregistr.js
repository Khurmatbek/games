/*  user registr part */
const elRegistrForm = document.querySelector(".registr-form");
const elRegistrUserName = document.querySelector(".registr__username");

const elRegistrUserPhone = document.querySelector(".registr__phone");
const elRegistrUserEmail = document.querySelector(".registr__email");
const elRegistrUserPassword = document.querySelector(".registr__password");
// console.log(elRegistrUserName.value());
/*  user login part  */
const elLoginForm = document.querySelector(".login-form")
const elLoginEmail = document.querySelector(".login__email");
const elLoginPassword = document.querySelector(".login__password");

// user_name
// phone
// email
// password
elRegistrForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const elRegistrUserNameValue = elRegistrUserName.value.trim();
    const elRegistrUserEmailValue = elRegistrUserEmail.value.trim();
    const elRegistrUserPasswordValue = elRegistrUserPassword.value;
    const elRegistrUserPhoneValue = elRegistrUserPhone.value.trim();

    registrPost(elRegistrUserNameValue, elRegistrUserPhoneValue, elRegistrUserEmailValue, elRegistrUserPasswordValue);


})

elLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const elLoginUserEmailValue = elLoginEmail.value.trim();
    const elLoginPasswordValue = elLoginPassword.value;
    loginPost(elLoginUserEmailValue, elLoginPasswordValue);
})


async function registrPost(username, phone, email, password) {
    try {
        const respons = await fetch("http://localhost:5000/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_name": username,
                "phone": phone,
                "email": email,
                "password": password,
            })
        });
        const result = await respons.json();
        localStorage.setItem("token", JSON.stringify(result));
        window.location.href = "index.html"
    } catch (error) {
        console.log(error);
    }
}

/*   user login */
async function loginPost(email, password) {
    try {
        const loginrespons = await fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "getTokenLogin",
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            })
        });
        const loginResult = await loginrespons.json();
        console.log(loginResult)
        localStorage.setItem("token", JSON.stringify(loginResult));
        if (loginResult.token) {
            window.location.href = "index.html"
        }
        if (loginResult.message) {
            window.location.reload();
        }



    } catch (error) {
        console.log(error)
    }
}
