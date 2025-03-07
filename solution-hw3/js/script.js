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

const packSelect = [1, 3, 5, 10]

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
    basePrice: 2.49,
    glazingPrice: 0,
    packPrice: 1
};

// onChange function for glazing drop down
function glazingChange(element) {
    
    //collect the glazing price from the drop down menu
    const priceChange = Number(element.value);

    //update orderSummary glazingPrice to be the glazing price from the drop down
    orderSummary.glazingPrice = priceChange;

    //call the update price function using the updated orderSummary object
    updatePrice(orderSummary);
};


// onChange function for pack size drop down
function packChange(element) {
    
    //collect the pack price from the drop down menu
    const priceChange = Number(element.value);

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

}