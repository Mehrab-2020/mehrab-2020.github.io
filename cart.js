// cart.js
// Handles shopping cart logic, UI injection, and WhatsApp checkout

(function () {
  const STORE_PHONE_NUMBER = "8801577098376"; // Use the new number

  // --- 1. State Management ---
  let cart = [];

  function loadCart() {
    const saved = localStorage.getItem("electroMartCart");
    if (saved) {
      cart = JSON.parse(saved);
    }
  }

  function saveCart() {
    localStorage.setItem("electroMartCart", JSON.stringify(cart));
    updateCartUI();
  }

  // Exposed globally to be called from product buttons
  window.addToCart = function (id, name, priceStr, image) {
    // Parse price to integer
    const price = parseInt(priceStr.replace(/[^0-9]/g, ''));
    
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, price, image, quantity: 1 });
    }
    saveCart();
    openCart(); // Show cart when item added
  };

  window.removeFromCart = function (id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
  };

  window.updateQuantity = function (id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        window.removeFromCart(id);
      } else {
        saveCart();
      }
    }
  };

  function getTotalItems() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function getTotalPrice() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // --- 2. UI Injection ---
  function injectStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
      /* Cart Floating Button */
      #cart-fab {
        position: fixed;
        bottom: 100px; /* Above whatsapp button */
        right: 30px;
        background: linear-gradient(135deg, #00d1ff, #0088ff);
        color: #000;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 209, 255, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
      }
      #cart-fab:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 209, 255, 0.6);
      }
      #cart-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #ef4444;
        color: white;
        font-size: 12px;
        font-weight: bold;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--bg-color);
      }

      /* Cart Sidebar */
      #cart-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.7);
        backdrop-filter: blur(5px);
        z-index: 2000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      #cart-overlay.active {
        opacity: 1;
        pointer-events: all;
      }
      
      #cart-sidebar {
        position: fixed;
        top: 0; right: -400px;
        width: 400px;
        height: 100vh;
        max-width: 100vw;
        background: var(--bg-color);
        border-left: 1px solid var(--card-border);
        box-shadow: -5px 0 30px rgba(0,0,0,0.5);
        z-index: 2001;
        display: flex;
        flex-direction: column;
        transition: right 0.3s cubic-bezier(0.175, 0.885, 0.32, 1);
      }
      #cart-sidebar.active {
        right: 0;
      }

      .cart-header {
        padding: 20px;
        border-bottom: 1px solid var(--card-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .cart-header h2 {
        font-family: 'Outfit', sans-serif;
        color: var(--text-main);
        font-size: 1.5rem;
      }
      .close-cart {
        background: transparent;
        border: none;
        color: var(--text-dim);
        font-size: 1.5rem;
        cursor: pointer;
        transition: color 0.2s;
      }
      .close-cart:hover {
        color: #ef4444;
      }

      .cart-items {
        flex-grow: 1;
        overflow-y: auto;
        padding: 20px;
      }
      .cart-empty {
        text-align: center;
        color: var(--text-dim);
        margin-top: 50px;
      }

      .cart-item {
        display: flex;
        gap: 15px;
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }
      .cart-item img {
        width: 60px; height: 60px;
        object-fit: cover;
        border-radius: 8px;
        background: #000;
      }
      .cart-item-details {
        flex-grow: 1;
      }
      .cart-item-title {
        font-size: 0.95rem;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .cart-item-price {
        color: var(--accent);
        font-size: 0.9rem;
      }
      .cart-item-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 8px;
      }
      .qty-btn {
        background: rgba(255,255,255,0.1);
        border: none; color: white;
        width: 24px; height: 24px;
        border-radius: 4px;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
      }
      .qty-btn:hover { background: rgba(255,255,255,0.2); }
      .remove-btn {
        background: transparent;
        border: none;
        color: #ef4444;
        font-size: 0.85rem;
        cursor: pointer;
        margin-left: auto;
      }

      .cart-footer {
        padding: 20px;
        border-top: 1px solid var(--card-border);
        background: rgba(0,0,0,0.3);
      }
      .cart-total {
        display: flex;
        justify-content: space-between;
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 15px;
        font-family: 'Outfit', sans-serif;
      }
      .checkout-btn {
        width: 100%;
        background: linear-gradient(135deg, #00d1ff, #0088ff);
        color: #000;
        border: none;
        padding: 15px;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .checkout-btn:hover {
        filter: brightness(1.1);
        box-shadow: 0 0 15px var(--accent-glow);
      }

      /* Checkout Modal */
      #checkout-modal {
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        padding: 30px;
        border-radius: 16px;
        width: 90%; max-width: 400px;
        z-index: 2002;
        box-shadow: 0 20px 50px rgba(0,0,0,0.7);
        opacity: 0; pointer-events: none;
        transition: all 0.3s ease;
      }
      #checkout-modal.active {
        opacity: 1; pointer-events: all;
        transform: translate(-50%, -50%) scale(1);
      }
      .form-group { margin-bottom: 15px; }
      .form-group label {
        display: block; margin-bottom: 5px; color: var(--text-dim); font-size: 0.9rem;
      }
      .form-group input, .form-group textarea {
        width: 100%;
        padding: 10px;
        background: rgba(0,0,0,0.3);
        border: 1px solid var(--card-border);
        color: white;
        border-radius: 6px;
        font-family: 'Inter', sans-serif;
      }
      .form-group input:focus, .form-group textarea:focus {
        outline: none; border-color: var(--accent);
      }
      .modal-btns {
        display: flex; gap: 10px; margin-top: 20px;
      }
      .btn-cancel {
        flex: 1; padding: 10px; border: 1px solid var(--text-dim);
        background: transparent; color: white; border-radius: 6px; cursor: pointer;
      }
      .btn-submit {
        flex: 2; padding: 10px; border: none;
        background: #25D366; color: white; border-radius: 6px; cursor: pointer;
        font-weight: bold;
        display: flex; justify-content: center; align-items: center; gap: 8px;
      }
    `;
    document.head.appendChild(style);
  }

  function injectUI() {
    const ui = document.createElement('div');
    ui.innerHTML = `
      <!-- FAB -->
      <div id="cart-fab" onclick="openCart()">
        🛒
        <div id="cart-badge" style="display:none;">0</div>
      </div>

      <!-- Sidebar -->
      <div id="cart-overlay" onclick="closeCart()"></div>
      <div id="cart-sidebar">
        <div class="cart-header">
          <h2>Your Cart</h2>
          <button class="close-cart" onclick="closeCart()">✕</button>
        </div>
        <div class="cart-items" id="cart-items-container">
          <!-- Items injected here -->
        </div>
        <div class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span id="cart-total-price">৳0</span>
          </div>
          <button class="checkout-btn" onclick="openCheckout()">Proceed to Checkout</button>
        </div>
      </div>

      <!-- Checkout Modal -->
      <div id="checkout-modal">
        <h2 style="margin-bottom: 20px; font-family: 'Outfit';">Delivery Details</h2>
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" id="co-name" placeholder="John Doe">
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input type="tel" id="co-phone" placeholder="01XXXXXXXXX">
        </div>
        <div class="form-group">
          <label>Full Address</label>
          <textarea id="co-address" rows="3" placeholder="House/Road/Area, District"></textarea>
        </div>
        <div class="modal-btns">
          <button class="btn-cancel" onclick="closeCheckout()">Cancel</button>
          <button class="btn-submit" onclick="submitOrder()">Order via WhatsApp</button>
        </div>
      </div>
    `;
    document.body.appendChild(ui);
  }

  window.openCart = function () {
    document.getElementById("cart-overlay").classList.add("active");
    document.getElementById("cart-sidebar").classList.add("active");
  };

  window.closeCart = function () {
    document.getElementById("cart-overlay").classList.remove("active");
    document.getElementById("cart-sidebar").classList.remove("active");
  };

  window.openCheckout = function () {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Close sidebar
    document.getElementById("cart-sidebar").classList.remove("active");
    // Show modal (overlay stays)
    document.getElementById("checkout-modal").classList.add("active");
  };

  window.closeCheckout = function () {
    document.getElementById("checkout-modal").classList.remove("active");
    // Remove overlay if cart is closed too
    document.getElementById("cart-overlay").classList.remove("active");
  };

  window.submitOrder = function () {
    const name = document.getElementById("co-name").value.trim();
    const phone = document.getElementById("co-phone").value.trim();
    const address = document.getElementById("co-address").value.trim();

    if (!name || !phone || !address) {
      alert("Please fill in all details!");
      return;
    }

    let message = `*New Order from Website*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Address: ${address}\n\n`;
    message += `*Order Items:*\n`;

    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (৳${item.price * item.quantity})\n`;
    });

    message += `\n*Total: ৳${getTotalPrice()}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_PHONE_NUMBER}?text=${encodedMessage}`;

    // Clear cart after redirecting (optional, maybe better to keep it until confirmed, but we'll clear it for simplicity)
    cart = [];
    saveCart();
    closeCheckout();

    window.open(whatsappUrl, '_blank');
  };

  function updateCartUI() {
    const badge = document.getElementById("cart-badge");
    const container = document.getElementById("cart-items-container");
    const totalEl = document.getElementById("cart-total-price");

    if (!badge || !container || !totalEl) return;

    const totalItems = getTotalItems();
    if (totalItems > 0) {
      badge.style.display = "flex";
      badge.innerText = totalItems;
    } else {
      badge.style.display = "none";
    }

    if (cart.length === 0) {
      container.innerHTML = `<div class="cart-empty">Your cart is empty</div>`;
      totalEl.innerText = "৳0";
      return;
    }

    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">৳${item.price}</div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
          </div>
        </div>
      </div>
    `).join("");

    totalEl.innerText = `৳${getTotalPrice()}`;
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    injectStyles();
    injectUI();
    updateCartUI();
  });

})();
