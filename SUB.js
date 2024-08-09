let cart = JSON.parse(localStorage.getItem('cart')) || [];
let fav = JSON.parse(localStorage.getItem('fav')) || [];

// Display thank you message
function displayMsg() {
    const thankingDiv = document.getElementById('thanking');
    const newLine = 'Thank you for the purchase';

    thankingDiv.innerHTML = newLine;
    thankingDiv.style.backgroundColor = 'white';
    thankingDiv.style.fontSize = '18px';
    thankingDiv.style.padding = '5px';
    thankingDiv.style.fontFamily = 'arial';

    console.log("Thanking message displayed");
}
// Retrieve and display user input values, including adding 3 days to the date
function displayUserInfo() {
    const email = document.getElementById("Email").value;
    const phone = document.getElementById("Phone").value;
    const username = document.getElementById("Username").value;
    const address = document.getElementById("address").value;
    const dateInput = document.getElementById("date").value;

    // Parse the date and add 3 days
    const date = new Date(dateInput);
    date.setDate(date.getDate() + 3);
    const newDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    // Display user information
    document.getElementById("emailDisplay").innerHTML = email;
    document.getElementById("phoneDisplay").innerHTML = phone;
    document.getElementById("usernameDisplay").innerHTML = username;
    document.getElementById("Final-msg").innerHTML = `Your products will be delivered ot the address ${address} on or before ${newDate}`;
}

// Display the total value of the cart
function displayCartTotal() {
    const cartTotal = localStorage.getItem('cart');

    if (cartTotal) {
        document.getElementById("cartTotalDisplay").innerHTML = `Total: ${cartTotal}`;
        console.log("Total value from cart:", cartTotal);
    } else {
        document.getElementById("cartTotalDisplay").innerHTML = `Total: 0.00`;
        console.log("No items in the cart.");
    }
}

// Call the displayUserInfo, displayMsg, and displayCartTotal functions on button click
document.getElementById('display-button').addEventListener('click', function() {
    displayUserInfo();
    displayMsg();
    displayCartTotal();
});