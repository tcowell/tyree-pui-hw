// HOMEWORK 5 CODE >>>>>

// create empty array
const cart = [];

// define Roll class
class Roll {
    element = null;
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// a function to get the price of a glazing option
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

    return Number(calcPrice);
}

//createCartItem()
// takes in a Roll as an argument
// create a new DOM element on cart page with
//      correct image
//      name of the item
//      glazing for the item
//      pack size
//      calculated price
//      remove button

function createCartItem(roll) {
    
    // access the template in the DOM and clone it
    const template = document.querySelector('#cart-item-template');
    const clone = template.content.cloneNode(true);
    const rollElement = clone.querySelector(".cart-item");

    // append clone to list of cart items in the DOM
    const cartListElement = document.querySelector('#cart-item-list');
    cartListElement.append(rollElement);

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
    const rollImageElement = rollElement.querySelector('.cart-image');

    const itemNameElement = rollElement.querySelector('#roll-name');
    const itemGlazingElement = rollElement.querySelector('#glazing');
    const itemPackSizeElement = rollElement.querySelector('#pack');
    const itemPriceElement = rollElement.querySelector('#roll-price');

    // update clone with info for current roll
    rollImageElement.src = rollImage;
    itemNameElement.innerText = itemName;
    itemGlazingElement.innerText = itemGlazing;
    itemPackSizeElement.innerText = itemPackSize;
    itemPriceElement.innerText = itemPrice;

}


// TODO: loop through cart[]
//      check that cart is not empty
//      call createCartItem()
//      update total price

for (const roll of cart) {
    console.log(roll);
    createCartItem(roll);
}


// TODO: onClick event for 'Remove'
//      remove item from array
//      remove DOM element from cart page
//      update toal price