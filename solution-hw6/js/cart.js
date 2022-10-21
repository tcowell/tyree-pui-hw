// HOMEWORK 5 and 6 CODE >>>>>

// function to access cart from local storage
// i know duplicate code is bad (this function is also in script.js)
//        but trying to share it between the files caused more problems than it solved
function getCart() {
    
    // default cart is an empty array
    let cart = [];
    
    // if there is a stored cart, get it from storage, parse it, and assign it to 'cart'
    if (localStorage.getItem('storedCart') != null) {
        const cartString = localStorage.getItem('storedCart');
        cart = JSON.parse(cartString);
    }

    return cart;
}

// default total price is 0
let totalPrice = 0;
// get the total price DOM element
const totalPriceElement = document.querySelector('#total-price');

// if there is a stored cart in local storage, retrieve it and assign its value to 'cart'
if (localStorage.getItem('storedCart') != null) {
    let cart = getCart();

    // loop through cart, call createCartItem for each roll
    // update the total price in the DOM after each roll is created
    for (const roll of cart) {
        const cost = createCartItem(roll);

        totalPrice = totalPrice + cost;
        totalPriceElement.innerText = "$ " + totalPrice.toFixed(2);
    }
}

// a function to get the price of a glazing option
function getGlazingPrice(glazing) {
    if (glazing == "Keep Original" || glazing == "Sugar Milk") {
        return 0;
    } else if (glazing == "Vanilla Milk") {
        return 0.5;
    } else if (glazing == "Double Chocolate") {
        return 1.5;
    } else {
        console.log("The glazing does not exist");
    }
}


// function to calculate price of an item
function calculateItemCost(roll) {
    //get glazing price
    const glazingPrice = getGlazingPrice(roll.glazing);

    //get pack price
    let packPrice = 0;
    if (roll.size === 12) {
        packPrice = 10;
    } else {
        packPrice = roll.size;
    }

    //calculate final cost
    let calcPrice = (roll.basePrice + glazingPrice) * packPrice;
    calcPrice = calcPrice.toFixed(2);

    return calcPrice;
}

//createCartItem()
// takes in a Roll as an argument
// create a new DOM element on cart page with correct info for the given roll
// returns the price of the given roll (so I don't have to call calculateItemCost() in the loop)

function createCartItem(roll) {
    
    // access the template in the DOM and clone it
    const template = document.querySelector('#cart-item-template');
    const clone = template.content.cloneNode(true);
    roll.element = clone.querySelector(".cart-item");

    // attach removeItem() function to 'remove' element
    const btnRemove = roll.element.querySelector('.remove');
    btnRemove.addEventListener('click', () => {
        removeItem(roll);
    });

    // append clone to list of cart items in the DOM
    const cartListElement = document.querySelector('#cart-item-list');
    cartListElement.append(roll.element);

    //create all required variables
    const currentRoll = rolls[roll.type];
    const rollImage = "./assets/products/" + currentRoll["imageFile"];
    const itemName = roll.type + " Cinnamon Roll";
    const itemGlazing = "Glazing: " + roll.glazing;
    const itemPackSize = "Pack Size: " + roll.size;

    //calculate price
    const calcPrice = calculateItemCost(roll);
    const itemPrice = "$ " + calcPrice;

    // collect all DOM elements
    const rollImageElement = roll.element.querySelector('.cart-image');
    const itemNameElement = roll.element.querySelector('#roll-name');
    const itemGlazingElement = roll.element.querySelector('#glazing');
    const itemPackSizeElement = roll.element.querySelector('#pack');
    const itemPriceElement = roll.element.querySelector('#roll-price');

    // update clone with info for current roll
    rollImageElement.src = rollImage;
    itemNameElement.innerText = itemName;
    itemGlazingElement.innerText = itemGlazing;
    itemPackSizeElement.innerText = itemPackSize;
    itemPriceElement.innerText = itemPrice;


    return Number(calcPrice);
}


// onClick function for 'Remove'
//      remove DOM element from cart page
//      remove item from cart array
//      update toal price

function removeItem(roll) {
    roll.element.remove();

    // get cart from local storage
    let cart = getCart();

    // find the given roll in cart
    const index = findRoll(roll, cart);

    // handling for when the cart is empty (not sure this is necessary here)
    if (index > -1) {
        // remove roll from cart array
        cart.splice(index, 1);
    }

    // set the price in the DOM to be 0 when the cart is empty
    if (cart.length === 0) {
        totalPriceElement.innerText = "$ 0.00";
    } else { // otherwise update the price by subtracting the cost of the given roll
        const itemPrice = calculateItemCost(roll);
        totalPrice = totalPrice - itemPrice;
        totalPriceElement.innerText = "$ " + totalPrice.toFixed(2);
    }

    //convert cart to a string and save to local storage
    const cartString = JSON.stringify(cart);
    localStorage.setItem('storedCart', cartString);

    //print the current contents of the cart
    console.log(cartString);
}


// function to find the first instance of a given roll in the cart
// had to hard code because neither indexOf() nor findIndex() would work
// has an issue with duplicate rolls:
//      if you remove the second duplicate from the DOM, it removes the first duplicate from the cart
function findRoll(roll, cart) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].type == roll.type && 
            cart[i].glazing == roll.glazing &&
            cart[i].size == roll.size &&
            cart[i].basePrice == roll.basePrice) {
                return i;
            }
    }
    return -1;
}