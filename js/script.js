let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
  const products = [
    { id: 'Smartphone X12', name: 'Smartphone X12', price: 3000 },
    { id: 'Tablette ProTab 10', name: 'Tablette ProTab 10', price: 2000 },
    { id: 'Montre Connectée Fit+', name: 'Montre Connectée Fit+', price: 500 },
    { id: 'Enceinte Bluetooth SoundBoom', name: 'Enceinte Bluetooth SoundBoom', price: 400 },
    { id: 'Casque Sans Fil ClearSound', name: 'Casque Sans Fil ClearSound', price: 600 },
    { id: 'Chargeur Rapide TurboCharge', name: 'Chargeur Rapide TurboCharge', price: 100 },
    { id: 'Lampe LED Dimmable', name: 'Lampe LED Dimmable', price: 150 },
    { id: 'Plaid Douillet en Polaire', name: 'Plaid Douillet en Polaire', price: 200 },
    { id: 'Diffuseur d\'Huiles Essentielles Aroma', name: 'Diffuseur d\'Huiles Essentielles Aroma', price: 250 },
    { id: 'Ensemble de Coussin Déco', name: 'Ensemble de Coussin Déco', price: 300 },
    { id: 'Cadres Muraux Vintage', name: 'Cadres Muraux Vintage', price: 180 },
    { id: 'Montre Élégante en Cuir', name: 'Montre Élégante en Cuir', price: 450 },
    { id: 'Sac à Main en Cuir', name: 'Sac à Main en Cuir', price: 600 },
    { id: 'Chaussures de Sport UltraComfort', name: 'Chaussures de Sport UltraComfort', price: 700 },
    { id: 'Lunettes de Soleil Fashion', name: 'Lunettes de Soleil Fashion', price: 250 },
    { id: 'Ceinture en Cuir Classique', name: 'Ceinture en Cuir Classique', price: 180 },
    ];

  const product = products.find(p => p.id === productId);

  const existingProduct = cart.find(item => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} has been added to your cart!`);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  const checkoutButton = document.getElementById('checkout-button');
  cartItemsDiv.innerHTML = '';

  let total = 0;
  cart.forEach(product => {
    const item = document.createElement('div');
    item.className = 'flex justify-between items-center';
    item.innerHTML = `
      <div>
        <span>${product.name}</span>
        <div class="flex items-center space-x-2">
          <button onclick="updateQuantity('${product.id}', -1)" class="text-gray-500">-</button>
          <span>${product.quantity}</span>
          <button onclick="updateQuantity('${product.id}', 1)" class="text-gray-500">+</button>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <span>${product.price * product.quantity} DH</span>
        <button onclick="removeFromCart('${product.id}')" class="text-red-600">Delete</button>
      </div>
    `;
    cartItemsDiv.appendChild(item);
    total += product.price * product.quantity;
  });

  totalElement.innerText = `Total: ${total} DH`;
  checkoutButton.disabled = cart.length === 0;
}


function updateQuantity(productId, change) {
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      removeFromCart(productId);
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

function checkout() {
  if (cart.length === 0) return;

  const productDetails = cart.map(product => `${product.name} - ${product.price * product.quantity} DH`).join(', ');
  const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shippingPrice = 30;
  const grandTotal = total + shippingPrice;

  const message = `Hello! Thank you for choosing MyShop. Here are the details of your order:\n\n${productDetails}.\n\nTotal Amount: ${total} DH\nShipping Cost: ${shippingPrice} DH\nGrand Total: ${grandTotal} DH.\n\nPlease confirm your order, and we will contact you shortly for delivery details.`;
  const phoneNumber = '+212622067493';
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, '_blank');
}

if (document.getElementById('cart-items')) {
  updateCartDisplay();
}





// Fonction pour gérer la soumission du formulaire de contact
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Empêche le rechargement de la page lors de la soumission

      // Récupère les valeurs du formulaire
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Affiche une alerte de confirmation
      alert(`Merci, ${name}! Votre message a été envoyé.\nNous vous contacterons bientôt à l'adresse ${email}.`);

      // Réinitialise le formulaire
      contactForm.reset();
    });
  }
});





