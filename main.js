console.log("Starting System");

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let fav = JSON.parse(localStorage.getItem('fav')) || [];

 // array for the list of products 
const products = [
    //fruits
    {name: "Banana", pricePerKg: 100},
    {name: "Oranges", pricePerKg: 120},
    {name: "Grapes", pricePerKg: 140},
    {name: "Mango", pricePerKg: 100},
    {name: "Dragon fruit", pricePerKg: 210},
    {name: "Apples", pricePerKg: 130},

    //vegetables
    {name: "Green beans", pricePerKg: 130},
    {name: "Cabage", pricePerKg: 120},
    {name: "Carrot", pricePerKg: 140},
    {name: "Bell pepper", pricePerKg: 160},
    {name: "Onions", pricePerKg: 90},
    {name: "Broccoli", pricePerKg: 180},

    //DairyProducts
    {name: "Milk", pricePerKg: 220},
    {name: "Cheese", pricePerKg: 180},
    {name: "Yoghurt", pricePerKg: 120},
    {name: "Butter", pricePerKg: 220},
    {name: "Chocolate", pricePerKg: 170},
    {name: "CookingCheese", pricePerKg: 180},

    //meat & seafood
    {name: "Chicken", pricePerKg: 130},
    {name: "Sausages", pricePerKg: 120},
    {name: "Prawns", pricePerKg: 140},
    {name: "Salmon", pricePerKg: 160},
    {name: "Seer fish", pricePerKg: 90},
    {name: "Eggs", pricePerKg: 180},

    //backing & cooking
    {name: "BackingPowder", pricePerKg: 130},
    {name: "Salt", pricePerKg: 120},
    {name: "Honey", pricePerKg: 160},
    {name: "Cupcake", pricePerKg: 110},
    {name: "Cookies", pricePerKg: 80},
    {name: "Crosant", pricePerKg: 200},
];

function addToCart(productIndex){
    const amount = parseFloat(document.getElementById(`amount-${productIndex}`).value);
    if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid number");
        return;
    }

    const product = {
        name: products[productIndex].name,
        amount: amount,
        pricePerKg: products[productIndex].pricePerKg,
        total: amount * products[productIndex].pricePerKg
    };

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTable();
    console.log("Product Added");
}

function applyFavourites() {
    
    // Save all current cart items as favourites without clearing the cart
    cart.forEach(item => {
        const isAlreadyFav = fav.some(favItem => favItem.name === item.name);
        if (!isAlreadyFav) {
            fav.push(item);
        }
    });

    // Save the updated favourites to localStorage
    localStorage.setItem('fav', JSON.stringify(fav));

    console.log("Items saved to favourites");
    alert("Items have been added to your favourites!");
}

function updateCartTable() {
    const tbody = document.getElementById("table").getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerHTML = item.name;
        
        const amountCell = row.insertCell(1);
        const inputId = `amount-${index}`;
        amountCell.innerHTML = `<input id="${inputId}" type="number" step="1" value="${item.amount}" onchange="updateAmount(${index}, this.value)">`;
        
        row.insertCell(2).innerText = item.pricePerKg.toFixed(2);
        row.insertCell(3).innerText = item.total.toFixed(2);
    
        const deleteCell = row.insertCell(4);
        deleteCell.innerHTML = `<button onclick="removeFromCart(${index})">delete</button>`;

        total += item.total; // Accumulate the total
    });

    // Save the total to localStorage
    localStorage.setItem('cartTotal', total.toFixed(2));

    // You can remove or keep the display of total in the cart table
    const totalRow = tbody.insertRow();
    const totalCell = totalRow.insertCell(0);
    totalCell.colSpan = 4;
    totalCell.style.textAlign = 'right';
    totalCell.innerHTML = `<strong>Total: ${total.toFixed(2)}</strong>`;

    // Buttons row
    const buttonsRow = tbody.insertRow();
    
    // Purchase button
    const purchaseCell = buttonsRow.insertCell(0);
    purchaseCell.colSpan = 2; 
    purchaseCell.innerHTML = '<a href="./order.html" id="purchase-button">Purchase</a>'; 
    purchaseCell.style.textAlign = 'left';

    // Apply Favourites
    const favCell = buttonsRow.insertCell(1); 
    favCell.colSpan = 2;
    favCell.innerHTML = '<a id="fav-button" onclick="applyFavourites()">Apply favorite</a>';
    favCell.style.textAlign = 'left';

    // Add to favourite button  
    const addfavCell = buttonsRow.insertCell(2); 
    addfavCell.colSpan = 2;
    addfavCell.innerHTML = '<a id="fav-button" onclick="addFavourites()">Add to favorite</a>';
    addfavCell.style.textAlign = 'left';

    // Apply hover effect for the purchase button 
    const purchaseButton = document.getElementById("purchase-button");
    purchaseButton.addEventListener('mouseover', () => {
        purchaseButton.style.transform = 'scale(1.1)'; 
    });

    // Apply hover effects for the favorite button 
    const favButton = document.getElementById("fav-button");
    favButton.addEventListener('mouseover', () => {
        favButton.style.transform = 'scale(1.1)'; 
    });
}


function removeFromCart(index) {
    // Remove item from cart
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartTable();
    console.log("Item removed from cart");
}

function updateAmount(index, newAmount){
    const amount = parseFloat(newAmount);
    if (isNaN(amount) || amount <= 0){
        alert('Please enter a valid amount');
        return;
    }

    cart[index].amount = amount;
    cart[index].total = amount * cart[index].pricePerKg;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTable();
}

updateCartTable();


