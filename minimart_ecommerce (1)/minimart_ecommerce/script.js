const products = [
      { id: 1, name: "Everyday Backpack", price: 899, emoji: "🎒" },
      { id: 2, name: "Wireless Headphones", price: 1299, emoji: "🎧" },
      { id: 3, name: "Water Bottle", price: 349, emoji: "🥤" },
      { id: 4, name: "Classic Watch", price: 999, emoji: "⌚" },
      { id: 5, name: "Running Shoes", price: 1599, emoji: "👟" },
      { id: 6, name: "Desk Lamp", price: 599, emoji: "💡" },
      { id: 7, name: "Sunglasses", price: 499, emoji: "🕶️" },
      { id: 8, name: "Notebook Set", price: 199, emoji: "📒" }
    ];
    const cart = {};

    function renderProducts(filter = "") {
      const list = document.getElementById("product-list");
      const matching = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
      list.innerHTML = matching.map(p => `
        <article class="product">
          <div class="product-image">${p.emoji}</div>
          <h3>${p.name}</h3>
          <p>₹${p.price.toLocaleString("en-IN")}</p>
          <button onclick="addToCart(${p.id})">Add to cart</button>
        </article>
      `).join("") || "<p>No products found. Try another search.</p>";
    }

    function addToCart(id) {
      cart[id] = (cart[id] || 0) + 1;
      renderCart();
    }

    function changeQuantity(id, amount) {
      cart[id] = (cart[id] || 0) + amount;
      if (cart[id] <= 0) delete cart[id];
      renderCart();
    }

    function renderCart() {
      const entries = Object.entries(cart);
      const count = entries.reduce((sum, [, qty]) => sum + qty, 0);
      const total = entries.reduce((sum, [id, qty]) => {
        const product = products.find(p => p.id === Number(id));
        return sum + product.price * qty;
      }, 0);
      document.getElementById("cart-count").textContent = count;
      document.getElementById("cart-total").textContent = total.toLocaleString("en-IN");
      const container = document.getElementById("cart-items");
      container.innerHTML = entries.length ? entries.map(([id, qty]) => {
        const p = products.find(item => item.id === Number(id));
        return `<div class="cart-row">
          <span>${p.emoji} ${p.name}<br><small>₹${p.price.toLocaleString("en-IN")} each</small></span>
          <span>
            <button aria-label="Decrease ${p.name} quantity" onclick="changeQuantity(${p.id}, -1)">−</button>
            <strong> ${qty} </strong>
            <button aria-label="Increase ${p.name} quantity" onclick="changeQuantity(${p.id}, 1)">+</button>
          </span>
          <strong>₹${(p.price * qty).toLocaleString("en-IN")}</strong>
        </div>`;
      }).join("") : '<p class="empty">Your cart is empty. Add something you love!</p>';
      document.getElementById("checkout-message").textContent = "";
    }

    function checkout() {
      const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
      document.getElementById("checkout-message").textContent = count
        ? "Demo checkout only — payment and order placement are not connected."
        : "Your cart is empty. Add a product before checkout.";
    }

    document.getElementById("search").addEventListener("input", event => renderProducts(event.target.value));
    renderProducts();
