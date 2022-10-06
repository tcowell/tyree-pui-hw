// HOMEWORK 5 CODE >>>>>

// create empty array
const cart = [];

// define Roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.element = null;
    }
}

// a function to get the price of a glazing option
// there's probably a better way to do this than hard-coding, but I didn't see any guidance for it in the HW
function getGlazingPrice(glazing) {
    if (glazing == "Original" || glazing == "Sugar Milk") {
        return 0;
    } else if (glazing == "Vanilla Milk") {
        return 0.5;
    } else if (glazing == "Double Chocolate") {
        return 1.5;
    } else {
        console.log("The glazing does not exist");
    }
}

// create 4 new rolls and add them to the cart array
// hope it's okay to hard code the base prices here, theoretically i could have gotten them from rollsData.js
let a = new Roll("Original", "Sugar Milk", 1, 2.49);
cart.push(a);

let b = new Roll("Walnut", "Vanilla Milk", 12, 3.49);
cart.push(b);

let c = new Roll("Raisin", "Sugar Milk", 3, 2.99);
cart.push(c);

let d = new Roll("Apple", "Original", 3, 3.49);
cart.push(d);


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


// loop through cart[]
//      call createCartItem()
//      update total price

let totalPrice = 0;
const totalPriceElement = document.querySelector('#total-price');

for (const roll of cart) {
    const cost = createCartItem(roll);

    totalPrice = totalPrice + cost;
    totalPriceElement.innerText = "$ " + totalPrice.toFixed(2);
}


// onClick function for 'Remove'
//      remove DOM element from cart page
//      remove item from cart array
//      update toal price

function removeItem(roll) {
    roll.element.remove();

    const index = cart.indexOf(roll);
    // handling for when the cart is empty (not sure this is necessary here)
    if (index > -1) {
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
}