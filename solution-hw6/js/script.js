// HOMEWORK 4 CODE (part 1)>> 

// parse the URL parameter and store the current roll type as a variable

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

// get the data for the current roll type
const currentRoll = rolls[rollType];
const imageFileName = currentRoll["imageFile"];
const rollPrice = currentRoll["basePrice"];

// update page header using roll data
const headerElement = document.querySelector(".body-header");
headerElement.innerText = rollType + " Cinnamon Roll";

// update image using roll data
const rollImage = document.querySelector(".detail-image");
rollImage.src = "./assets/products/" + imageFileName;

// update price using roll data
const price = document.querySelector('#price');
price.innerHTML = "$ " + rollPrice;



// HOMEWORK 3 CODE >>


// Define objects for glazing options

const keepOriginal = {
    optionName: "Keep Original",
    glazingPrice: 0
};

const sugarMilk = {
    optionName: "Sugar Milk",
    glazingPrice: 0
};

const vanillaMilk = {
    optionName: "Vanilla Milk",
    glazingPrice: 0.5
};

const doubleChocolate = {
    optionName: "Double Chocolate",
    glazingPrice: 1.5
};


// Use loop to set drop down options for glazing

const glazingSelect = [keepOriginal, sugarMilk, vanillaMilk, doubleChocolate];

document.addEventListener('DOMContentLoaded', function() {
    let glazingOptions = document.querySelector('#glazing');

    let options = '';
    for (let item of glazingSelect) {
        options += `<option value=${item.glazingPrice}>${item.optionName}</option>`;
    }

    glazingOptions.innerHTML = options;
});



// Use loop to set drop down options for pack size

const packSelect = [1, 3, 5, 12]

document.addEventListener('DOMContentLoaded', function() {
    let packOptions = document.querySelector('#pack');

    let options = '';
    for (let item of packSelect) {
        options += `<option value=${item}>${item}</option>`;
    }

    packOptions.innerHTML = options;
});



// Create object for price caluclations
const orderSummary = {
    basePrice: currentRoll["basePrice"],
    glazingType: "Keep Original",
    glazingPrice: 0,
    packPrice: 1
};

// onChange function for glazing drop down
function glazingChange(element) {
    
    //collect the glazing price from the drop down menu
    const priceChange = Number(element.value);

    //update orderSummary glazingPrice to be the glazing price from the drop down
    orderSummary.glazingPrice = priceChange;

    //update orderSummary glazingType to be the name of the glazing selected
    orderSummary.glazingType = element.options[element.selectedIndex].text;

    //call the update price function using the updated orderSummary object
    updatePrice(orderSummary);
};


// onChange function for pack size drop down
function packChange(element) {
    
    //collect the pack price from the drop down menu
    let priceChange = Number(element.value);

    if (priceChange === 12) {
        priceChange = 10;
    }

    //update orderSummary packPrice to be the pack size from the drop down
    orderSummary.packPrice = priceChange;

    //call the update price function using the updated orderSummary object
    updatePrice(orderSummary);
};


// function that updates the price in the DOM
function updatePrice(order) {

    //select the price element in the DOM
    let price = document.querySelector('#price');

    //caluclate the final price to be displayed using values in orderSummary
    let finalPrice = (order.basePrice + order.glazingPrice) * order.packPrice;
    finalPrice = finalPrice.toFixed(2);

    //update DOM to display new price
    price.innerHTML = '$ ' + finalPrice;

};


// HOMEWORK 4 CODE (PART 2) >>>

// define Roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}


// function to access cart from local storage
// i know duplicate code is bad (this function is also in cart.js)
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

// onclick function for 'Checkout' button
function addToCart() {

    //gather info to create Roll object
    const rollGlazing = orderSummary.glazingType;
    const packSize = orderSummary.packPrice;
    const basePrice = orderSummary.basePrice;

    //create a new Roll object with the correct values
    const roll = new Roll(rollType, rollGlazing, packSize, basePrice);

    // gets an existing cart (if there is one)
    let cart = getCart();

    //add new roll to cart array
    cart.push(roll);

    //convert cart to a string and save to local storage
    const cartString = JSON.stringify(cart);
    localStorage.setItem('storedCart', cartString);

    //print the current contents of the cart
    console.log(cartString);
}

