document.addEventListener('DOMContentLoaded', function() {
    const plantList = document.getElementById('plant-list');
    const searchInput = document.getElementById('search');
    const cartItems = document.getElementById('cart-items');
    const sortPriceBtn = document.getElementById('sortPrice');
    const sortPopularityBtn = document.getElementById('sortPopularity');
    const sortAlphabeticalBtn = document.getElementById('sortAlphabetical'); // Add this line
    const categoryLinks = document.querySelectorAll('nav a');
    const checkoutBtn = document.getElementById('checkout');
    const messageArea = document.createElement('div');
    messageArea.id = 'message';
    document.body.appendChild(messageArea);

    let plants = [];
    let cart = [];

    // Load plant data from JSON file
    fetch('json/data.json')
        .then(response => response.json())
        .then(data => {
            plants = data;
            displayPlants('indoor');
        });

    // Display plants based on category
    function displayPlants(category) {
        plantList.innerHTML = '';
        const filteredPlants = plants.filter(plant => plant.category === category);
        filteredPlants.forEach(plant => {
            const plantDiv = document.createElement('div');
            plantDiv.classList.add('plant-item');
            plantDiv.innerHTML = `
                <img src="${plant.image}" alt="${plant.name}" class="plant-image">
                <h3>${plant.name}</h3>
                <p>Price: $${plant.price}</p>
                <p>${plant.description}</p>
                <button data-id="${plant.id}" class="add-to-cart">Add to Cart</button>
            `;
            plantList.appendChild(plantDiv);
        });
        addEventListenersToButtons();
    }

    // Add event listeners to buttons
    function addEventListenersToButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const plantId = this.getAttribute('data-id');
                const plant = plants.find(p => p.id === plantId);
                addToCart(plant);
            });
        });
    }

    // Add plant to cart
    function addToCart(plant) {
        cart.push(plant);
        updateCart();
        displayMessage('Plant added to cart successfully!', 'success');
    }

    // Update cart display
    function updateCart() {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = item.name;
            cartItems.appendChild(cartItem);
        });
    }

    // Display success or error message
    function displayMessage(message, type) {
        messageArea.textContent = message;
        messageArea.className = `message ${type}`;
        messageArea.style.display = 'block';
        setTimeout(() => {
            messageArea.style.display = 'none';
        }, 3000);
    }

    // Search plants
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const filteredPlants = plants.filter(plant => plant.name.toLowerCase().includes(query));
        displayFilteredPlants(filteredPlants);
    });

    function displayFilteredPlants(filteredPlants) {
        plantList.innerHTML = '';
        filteredPlants.forEach(plant => {
            const plantDiv = document.createElement('div');
            plantDiv.classList.add('plant-item');
            plantDiv.innerHTML = `
                <img src="${plant.image}" alt="${plant.name}" class="plant-image">
                <h3>${plant.name}</h3>
                <p>Price: $${plant.price}</p>
                <p>${plant.description}</p>
                <button data-id="${plant.id}" class="add-to-cart">Add to Cart</button>
            `;
            plantList.appendChild(plantDiv);
        });
        addEventListenersToButtons();
    }

    // Sort plants by price or popularity
    sortPriceBtn.addEventListener('click', function() {
        plants.sort((a, b) => a.price - b.price);
        displayPlants(document.querySelector('nav a.active').getAttribute('data-category'));
    });

    sortPopularityBtn.addEventListener('click', function() {
        plants.sort((a, b) => b.popularity - a.popularity);
        displayPlants(document.querySelector('nav a.active').getAttribute('data-category'));
    });

    // Alphabetical sorting
    sortAlphabeticalBtn.addEventListener('click', function() {
        plants.sort((a, b) => a.name.localeCompare(b.name));
        displayPlants(document.querySelector('nav a.active').getAttribute('data-category'));
    });

    // Category navigation
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = this.getAttribute('data-category');
            displayPlants(category);
            categoryLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Set default category
    document.querySelector('nav a[data-category="indoor"]').click();

    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            displayMessage('Order placed successfully!', 'success');
            cart = [];
            updateCart();
        } else {
            displayMessage('Your cart is empty!', 'error');
        }
    });
});
function displayMessage(message, type) {
    console.log(`Displaying message: ${message} of type: ${type}`); // Debug log
    messageArea.textContent = message;
    messageArea.className = `message ${type}`;
    messageArea.style.display = 'block';
    setTimeout(() => {
        messageArea.style.display = 'none';
    }, 3000);
}
const messageArea = document.createElement('div');
messageArea.id = 'message';
document.body.appendChild(messageArea);
document.addEventListener('DOMContentLoaded', () => {
    const plantItems = document.querySelectorAll('.plant-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.1 });

    plantItems.forEach(item => observer.observe(item));
});

