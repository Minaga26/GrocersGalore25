// Retrieve cart and favorites from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let fav = JSON.parse(localStorage.getItem('fav')) || [];

// Display thank you message
function displayMsg() {
    const thankingDiv = document.getElementById('thanking');
    const newLine = 'Thank you for the purchase';
    thankingDiv.innerHTML = newLine;

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
    document.getElementById("Final-msg").innerHTML = `Your products will be delivered on or before ${newDate}`;
}

// Display only the total value of the cart
function displayCartTotal() {
    const cartTotal = localStorage.getItem('cartTotal');

    if (cartTotal) {
        // Display total value in a specific HTML element
        document.getElementById("cartTotalDisplay").innerHTML = `Total: ${cartTotal}`;
        console.log("Total value from cart:", cartTotal);
    } else {
        document.getElementById("cartTotalDisplay").innerHTML = `Total: 0.00`;
        console.log("No items in the cart.");
    }
}


// Validate if all fields are filled
function validateFields() {
    const email = document.getElementById("Email").value;
    const phone = document.getElementById("Phone").value;
    const username = document.getElementById("Username").value;
    const address = document.getElementById("address").value;
    const dateInput = document.getElementById("date").value;

    if (!email || !phone || !username || !address || !dateInput) {
        alert("Please fill out all fields.");
        return false;
    }
    return true;
}

// Function to display the message box
function showMessageBox() {
    const messageBox = document.getElementById('completed');
    messageBox.style.display = 'block'; // Show the message box
}

// Function to close the message box
function closeMessageBox() {
    const messageBox = document.getElementById('completed');
    messageBox.style.display = 'none'; // Hide the message box
}

//  Complete button click event
function handleCompleteButtonClick() {
    if (validateFields()) {
        displayUserInfo();
        displayMsg();
        displayCartTotal();
        showMessageBox();
    }
}

// event listener to the "Complete" button
document.getElementById('display-button').addEventListener('click', handleCompleteButtonClick);

//  event listener to the close button
document.getElementById('closeButton').addEventListener('click', closeMessageBox);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('closeButton').addEventListener('click', closeMessageBox);
});