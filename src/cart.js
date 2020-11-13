let carts__items = document.querySelectorAll(".button-light");

let products = [{
        name: "HyperX Alloy Core FPS",
        tag: "corefps",
        price: 6999,
        inCart: 0
    },
    {
        name: "HyperX Alloy Elite 2",
        tag: "elite2",
        price: 5999,
        inCart: 0
    },
    {
        name: "HyperX Alloy FPS pro",
        tag: "fpspro",
        price: 7499,
        inCart: 0
    },
    {
        name: "HyperX Alloy FPS RGB",
        tag: "fpsrgb",
        price: 7999,
        inCart: 0
    }
];

for (let i = 0; i < carts__items.length; i++) {
    carts__items[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalcost(products[i]);

    })
}

function onloadcartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector(".nav__shop span").textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector(".nav__shop span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector(".nav__shop span").textContent = 1;
    }

    setItem(product);
}

function setItem(product) {
    let cartitems = localStorage.getItem('productsInCart');
    cartitems = JSON.parse(cartitems)

    if (cartitems != null) {

        if (cartitems[product.tag] == undefined) {
            cartitems = {
                ...cartitems,
                [product.tag]: product
            }
        }
        console.log(cartitems[product.tag]);
        cartitems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;

        cartitems = {
            [product.tag]: product
        }
    }



    localStorage.setItem("productsInCart", JSON.stringify(cartitems));
}

function totalcost(product) {
    //console.log("el precio del producto es", product.price);
    let cartCost = localStorage.getItem('totalcost');

    console.log("my cartcost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalcost", cartCost +
            product.price);

    } else {
        localStorage.setItem("totalcost", product.price);
    }

}

function displayCart(products) {
    let cartitems = localStorage.getItem("productsInCart");

    cartitems = JSON.parse(cartitems);

    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalcost');
    console.log(cartitems);
    if (cartitems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartitems).map(item => {
            productContainer.innerHTML += `
            <div class="productcard">
            <div class="product">
                <i class='bx bx-x'></i>
                <img src=./img/teclados/${item.tag}.png>
                <span >${item.name}</span>
            </div>
            <div class="precio">$${item.price}</div>
            <div class="cantidad">
                <div class="iconos">
                    <i class='bx bx-minus'></i>
                </div>
                <span>${item.inCart}</span>
                <div class="iconos">
                    <i class='bx bx-plus'></i>
                </div>
            </div>
            <div class="total">
                $${item.inCart* item.price}
            </div>
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class="preciototalcontainer">
                <h4 class="preciototal__titulo">
                    Precio Total
                </h4>
                <h4 class="preciototal">
                    $${cartCost}
                </h4>
            </div>
        `

        let iconos = document.querySelectorAll('.iconos');

        for (let i = 1; i < iconos.length; i++) {
            iconos[0].addEventListener('click', () => {
                console.log("menos");
                less();
            })
            iconos[1].addEventListener('click', () => {
                console.log("mas");
                more();
            })
        }

        function more() {

            let productNumbers = localStorage.getItem('cartNumbers');

            productNumbers = parseInt(productNumbers);

            if (productNumbers) {
                localStorage.setItem('cartNumbers', productNumbers + 1);
                document.querySelector(".cantidad span").textContent = productNumbers + 1;
            } else {
                localStorage.setItem('cartNumbers', 1);
                document.querySelector(".cantidad span").textContent = 0;
            }
        }

        function less() {
            let productcard = document.querySelector(".productcard");
            let productNumbers = localStorage.getItem('cartNumbers');

            productNumbers = parseInt(productNumbers);

            if (productNumbers) {
                localStorage.setItem('cartNumbers', productNumbers - 1);
                document.querySelector(".cantidad span").textContent = productNumbers - 1;
            } else {
                localStorage.setItem('cartNumbers', 1);
                document.querySelector(".cantidad span").textContent = 0;
            }

            if (document.querySelector(".cantidad span").textContent == 0) {

                productcard.innerHTML = '';
                productcard.localStorage();
            }
        }



        /*iconos[0].addEventListener('click', (cartitem) => {
            console.log("menos");
            cartitem.inCart -= 1;
            console.log(cartitem.inCart);
        })
        iconos[1].addEventListener('click', (cartitem) => {
            console.log("mas");
            cartitem.inCart += 1;
            console.log(cartitem.inCart);
        })*/
    }
}





onloadcartNumbers();
displayCart(products);

/**/