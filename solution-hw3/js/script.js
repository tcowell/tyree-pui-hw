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

const glazingSelect = [keepOriginal, sugarMilk, vanillaMilk, doubleChocolate];

document.addEventListener('DOMContentLoaded', function() {
    let glazingOptions = document.querySelector('#glazing');

    let options = '';
    for (let item of glazingSelect) {
        options += `<option value=${item.glazingPrice}>${item.optionName}</option>`;
    }

    glazingOptions.innerHTML = options;
});

const packSelect = [1, 3, 5, 10]

document.addEventListener('DOMContentLoaded', function() {
    let packOptions = document.querySelector('#pack');

    let options = '';
    for (let item of packSelect) {
        options += `<option value=${item}>${item}</option>`;
    }

    packOptions.innerHTML = options;
});

function glazingChange(element) {
    const priceChange = Number(element.value);
    console.log(priceChange);

    let newPrice = priceChange + 2.49;
    console.log(newPrice);

    let price = document.querySelector('#price');
    price.innerHTML = '$ ' + newPrice;
};