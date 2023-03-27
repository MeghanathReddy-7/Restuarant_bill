let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: "French Fries",
        price: 99,
        incart: 0,
    },
    {
        name: "Veg Manchurian",
        price: 139,
        incart: 0,
    },
    {
        name: "Chilli Panner",
        price: 189,
        incart: 0,
    },
    {
        name: "Butter Naan",
        price: 49,
        incart: 0,
    },
    {
        name: "Panner Butter Masala",
        price: 239,
        incart: 0,
    },
    {
        name: "Veg Dum Biryani",
        price: 239,
        incart: 0,
    },
    {
        name: "Butter Chicken",
        price: 299,
        incart: 0,
    },
    {
        name: "Chicken Lollipop",
        price: 149,
        incart: 0,
    },
    {
        name: "Fish Fingers",
        price: 289,
        incart: 0,
    },
    {
        name: "Mutton Curry",
        price: 349,
        incart: 0,
    },
    {
        name: "Hyderabadi Chicken Biryani",
        price: 289,
        incart: 0,
    },
    {
        name: "Hyderabadi Mutton Biryani",
        price: 399,
        incart: 0,
    },
    {
        name: "Chocolate Hazelnut dessert",
        price: 289,
        incart: 0,
    },
    {
        name: "Pista IceCream",
        price: 199,
        incart: 0,
    },
    {
        name: "Oreo Cheesecake",
        price: 249,
        incart: 0,
    },


];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartnumber(products[i]);
        totalcost(products[i]);
    })
}

function onloadcartnumbers() {
    let productnumbers = localStorage.getItem('cartnumber');
    if (productnumbers) {
        document.querySelector('.CART span').textContent = productnumbers;
    }
}

function cartnumber(product) {
    let productnumbers = localStorage.getItem('cartnumber');
    productnumbers = parseInt(productnumbers);
    if (productnumbers) {
        localStorage.setItem('cartnumber', productnumbers + 1);
        document.querySelector('.CART span').textContent = productnumbers + 1;
    } else {
        localStorage.setItem('cartnumber', 1);
        document.querySelector('.CART span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productincart');
    cartItems=JSON.parse(cartItems);
    if(cartItems!= null){
        if(cartItems[product.name] == undefined){
            cartItems={
                ...cartItems,
            [product.name]:product
            }
            
        }
        cartItems[product.name].incart+=1;
    }else{
        product.incart = 1;
    cartItems={
        [product.name]:product
    }
    }
    localStorage.setItem("productincart",JSON.stringify(cartItems));
}
function totalcost(product){
    let cartCost=localStorage.getItem('totalcost');

    if(cartCost!=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem('totalcost',cartCost + product.price);
    }else{
        localStorage.setItem('totalcost',product.price);
    }
    
}
function display(){
    let cartItems = localStorage.getItem("productincart");
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".products");
    let cartCost=localStorage.getItem('totalcost');
    if(cartItems && productContainer){
        productContainer.innerHTML= '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML+= `
            <div class="product">
                

                <span>${item.name}</span>
            </div>
            <div class="price">₹${item.price}</div>
            <div class="quantity">
                
                <span>${item.incart}</span>
                
            </div>
            <div class="total">₹${item.incart * item.price}</div>
            `;
        });
        productContainer.innerHTML += `
            <div class="menutotalcontainer">
                <h4 class="basketTotalTitle">
                    Menu Total
                </h4>
                <h4 class="menutotal">
                    ₹${cartCost}
                </h4>

            </div>
        `;

    }
}
onloadcartnumbers();       
display();                           