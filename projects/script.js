
$(document).ready(function() {
    $("a").on("click", function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $("html, body").animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Close menu when a link is clicked
    $(".menu-items a").click(function () {
        $("#checkbox").prop("checked", false);
    });
});
        // Load the header
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header').innerHTML = data;
                updateCartCount(); // Call to update the cart count on header load
            });

    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to display cart items and calculate total price
    function displayCartItems() {
        let cartItemsDiv = document.getElementById('cart-items');
        let totalPriceDiv = document.getElementById('total-price');
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
            totalPriceDiv.innerHTML = "";
        } else {
            let cartContent = "<ul>";
            cart.forEach((item, index) => {
                let itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;
                cartContent += `
                    <li>
                        ${item.name} - Kshs.${item.price} x ${item.quantity} = Kshs.${itemTotal}
                        <button class="remove-item" onclick="removeItem(${index})">Remove</button>
                    </li>`;
            });
            cartContent += "</ul>";
            cartItemsDiv.innerHTML = cartContent;

            // Display the total price
            totalPriceDiv.innerHTML = `<strong>Total Price: Kshs.${totalPrice}</strong>`;
        }
    }
	function addToCart(productName, price) {
        // Get the current cart from localStorage or create a new empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Create an object for the new item
        let newItem = {
            name: productName,
            price: price,
            quantity: 1
        };

        // Check if the item already exists in the cart
        let existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            // If item exists, update the quantity
            existingItem.quantity += 1;
        } else {
            // If item doesn't exist, add the new item to the cart
            cart.push(newItem);
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Item added to cart!');
    }



    // Function to remove a specific item from the cart
    function removeItem(index) {
        cart.splice(index, 1); // Remove item from cart array
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        displayCartItems(); // Refresh displayed cart items
        updateCartCount(); // Update the cart count in the header
    }

    // Clear Cart button functionality
    document.getElementById('clear-cart').addEventListener('click', function() {
        localStorage.removeItem('cart'); // Clear the cart from localStorage
        cart = []; // Reset cart array
        displayCartItems(); // Refresh displayed cart items
        updateCartCount(); // Update the cart count in the header
    });

    // Order Now button functionality
    document.getElementById('order-now').addEventListener('click', function() {
        if (cart.length > 0) {
            let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert('Proceeding to purchase. Total amount: Kshs.' + totalPrice);
            // Here you can add the code to redirect to a payment or checkout page
        } else {
            alert('Your cart is empty. Add items to buy.');
        }
    });

    // Call displayCartItems on page load to show the correct cart items
    window.onload = function() {
        displayCartItems();
        updateCartCount(); // Update cart count on load
    };
// Function to update the cart count display
    function updateCartCount() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            let cartCountElement = document.getElementById('cart-count');

            if (totalItems > 0) {
                cartCountElement.textContent = totalItems;
                cartCountElement.style.display = 'inline'; // Show badge
            } else {
                cartCountElement.style.display = 'none'; // Hide badge if empty
            }
        }

        // Call updateCartCount on page load to show the correct cart count
        window.onload = function() {
            updateCartCount();
        };