const token = JSON.parse(localStorage.getItem("token") || "false");
setTimeout(() => {
    if (!token) {
        window.location.pathname = "login.html"
    }
}, 4000);
const template = document.querySelector(".product_template").content;
const fragment = new DocumentFragment();
const form = document.querySelector(".form");
const productName = document.querySelector(".name");
const productDesc = document.querySelector(".desc");
const productImg = document.querySelector(".img");
const productPrice = document.querySelector(".price");
const List = document.querySelector(".list");
const Item = document.querySelector(".item");
/*  edit modal form */
const editForm = document.querySelector(".edit-form");
const editName = document.querySelector(".edit-name");
const editDesc = document.querySelector(".edit-desc");
const editImage = document.querySelector(".edit-img");
const editPrice = document.querySelector(".edit-price");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("product_name", productName.value)
    formData.set("product_img", productImg.files[0])
    formData.set("product_desc", productDesc.value)
    formData.set("product_price", productPrice.value)
    await adminPost(formData);
})



/*  adminpost */
async function adminPost(data) {
    try {
        const respons = await fetch("http://localhost:5000/product", {
            method: "POST",
            headers: {
                Authorization: token.token,
            },
            body: data,
        });
        const result = await respons.json();
        window.location.reload();
    } catch (error) {
        console.log(error)
    }
}

function renderProduct(product_data) {
    product_data.forEach(element => {
        const tempalteClone = template.cloneNode(true);
        tempalteClone.querySelector(".image").src = `http://localhost:5000/${element.product_img}`;
        tempalteClone.querySelector(".product-name").textContent = element.product_name;
        tempalteClone.querySelector(".product-price").textContent = element.product_price;
        tempalteClone.querySelector(".product-desc").textContent = element.product_desc;
        const deletebtn = tempalteClone.querySelector(".delete");
        const editBtn = tempalteClone.querySelector(".edit");
        deletebtn.setAttribute("data-id", `${element.id}`);
        editBtn.setAttribute("data-id", `${element.id}`);
        fragment.append(tempalteClone);
    });
    List.append(fragment);
}
/*  admin get */
async function adminGet() {
    try {
        const getrespons = await fetch("http://localhost:5000/product", {
            method: "GET",
            headers: {
                Authorization: token.token,
            }
        });
        const getdata = await getrespons.json();
        renderProduct(getdata)
    } catch (error) {
        console.log(error)
    }
}
adminGet()

/*  admindelete */
async function adminDelete(id) {
    try {
        const deleteRespons = await fetch(`http://localhost:5000/product/` + id, {
            method: "DELETE",
            headers: {
                Authorization: token.token,
            },
        });
        const deleteResult = await deleteRespons.json();
        window.location.reload()
        renderProduct(product_data)
    } catch (error) {
        console.log(error)
    }
}
List.addEventListener("click", async (e) => {
    if (e.target.matches(".delete")) {
        const id = e.target.dataset.id;
        await adminDelete(id);
        adminGet()
    }
})



/*  edit form */
List.addEventListener("click", async (e) => {
    if (e.target.matches(".edit")) {
        const editId = e.target.dataset.id;
        localStorage.setItem("id", JSON.stringify(editId));
    }
})
editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const editId = JSON.parse(localStorage.getItem("id"))
    await adminEdit(editId)
    window.location.reload();
});
async function adminEdit(id) {
    try {
        const editFormData = new FormData();
        editFormData.set("product_name", editName.value);
        editFormData.set("product_desc", editDesc.value);
        editFormData.set("product_img", editImage.files[0]);
        editFormData.set("product_price", editPrice.value)
        const editRespons = await fetch(`http://localhost:5000/product/` + id, {
            method: "PUT",
            headers: {
                Authorization: token.token,
            },
            body: editFormData,
        });
        const editresult = await editRespons.json();
        console.log(editresult)
    } catch (error) {
        console.log(error)
    }

}