// Custom callback function for handling favorite button clicks
function handleFavoriteClick(event) {
    const heartIcon = event.currentTarget.querySelector('i');
    heartIcon.classList.toggle('fas');
    heartIcon.classList.toggle('far');
    heartIcon.style.color = heartIcon.classList.contains('fas') ? '#ff4757' : '#333';
}

// Function to create and add notification element
function createNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    // DOM Traversal Methods
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const productCards = document.querySelectorAll('.product-card');
    const quickOrderButtons = document.querySelectorAll('.quick-order-btn');

    // Mouse Events
    // 1. Hamburger menu click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('active');
        });
    }

    // 2. Favorite button click
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', handleFavoriteClick);
    });

    // 3. Product card hover effect
    productCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
        });
    });

    // Key-based Event
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('active');
        }
    });

    // Quick Order Button Click
    quickOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // DOM Tree Navigation
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Create notification
            createNotification(`Added ${productName} (${productPrice}) to cart!`);
        });
    });

    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #539649;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}); 