const token = JSON.parse(localStorage.getItem("token") || "false");
setTimeout((item) => {
    if (!token) {
        document.body.classList.add("fixed");
        document.querySelector(".sec-modal").classList.add("sec-flex-modal");
    }
    else {
        document.body.classList.remove("fixed");
        document.querySelector(".sec-modal").classList.remove("sec-flex-modal");
    }
}, 5000);
const productTemplate = document.querySelector(".product__tempalte").content;
const fragment = new DocumentFragment();
const list = document.querySelector(".sale__list");
const buyButton = document.querySelector(".sale__buy");
const orderList = document.querySelector(".order__list");
const orderTemplate = document.querySelector(".order__tempalte").content;
const orderFragment = new DocumentFragment();
function renderMain(data) {
    list.innerHTML = ""
    data.forEach(element => {
        const templateClone = productTemplate.cloneNode(true);
        templateClone.querySelector(".sale__image").src = `http://localhost:5000/${element.product_img}`;
        templateClone.querySelector(".sale__product-name").textContent = element.product_name;
        templateClone.querySelector(".sale__product-desc").textContent = element.product_desc;
        templateClone.querySelector(".sale__product-price").textContent = element.product_price;
        const BuyBtn = templateClone.querySelector(".sale__buy");
        BuyBtn.setAttribute("data-id", element.id);
        fragment.append(templateClone);
    });
    list.append(fragment);
}

async function get() {
    try {
        const getRespons = await fetch("http://localhost:5000/product", {
            method: "GET",
            headers: {
                Authorization: token.token,
            },
        });
        const getResult = await getRespons.json();
        renderMain(getResult)
    } catch (error) {
        console.log(error)
    }
}
get()

/* post orders */

list.addEventListener("click", async (e) => {
    if (e.target.matches(".sale__buy")) {
        if (token) {
            const buyId = e.target.dataset.id;
            await orderPost(buyId);
            await orderGet()
        }
        else {
            window.location.pathname = "login.html"
        }
    }

})

function orderRender(arr) {
    orderList.innerHTML = ""
    arr.forEach(item => {
        const orderTemplateClone = orderTemplate.cloneNode(true);
        orderTemplateClone.querySelector(".order__image").src = `http://localhost:5000/${item.product_img}`;
        orderTemplateClone.querySelector(".order__name").textContent = `${item.product_name}`;
        orderTemplateClone.querySelector(".username").textContent = `${item.user_name}`;
        const removeBtn = orderTemplateClone.querySelector(".order__remove");
        removeBtn.setAttribute("data-id", `${item.id}`);
        orderFragment.append(orderTemplateClone);
    })
    orderList.append(orderFragment);
}


async function orderPost(id) {
    const orderRespons = await fetch("http://localhost:5000/order",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: token.token,
            },
            body: JSON.stringify({
                product_id: Number(id)
            }),
        })
    const orderResult = await orderRespons.json();

}


orderList.addEventListener("click", async (e) => {
    if (e.target.matches(".order__remove")) {
        const orderID = e.target.dataset.id;
        await orderDelete(orderID);
        await orderGet()
    }
})


async function orderGet() {
    const orderGetRespons = await fetch("http://localhost:5000/order", {
        method: "GET",
        headers: {
            Authorization: token.token
        }
    });
    const orderGetResult = await orderGetRespons.json();
    document.querySelector(".position-absolute").textContent = orderGetResult.length;
    orderRender(orderGetResult)

}
orderGet()

/*   orderDelete*/
async function orderDelete(id) {
    try {
        const orderDeleteRes = await fetch(`http://localhost:5000/order/` + id, {
            method: "DELETE",
            headers: {
                Authorization: token.token
            },
        });
        const orderDeleteResult = await orderDeleteRes.json();
    } catch (error) {
        console.log(error)
    }
}





