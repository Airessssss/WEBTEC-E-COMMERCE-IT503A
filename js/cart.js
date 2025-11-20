document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const modal = document.getElementById("confirm-modal");
  const confirmRemove = document.getElementById("confirm-remove");
  const cancelRemove = document.getElementById("cancel-remove");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let itemToRemoveIndex = null;

  // ✅ Calculate total for checked items
  function calculateTotal() {
    let total = 0;
    const checkboxes = document.querySelectorAll(".cart-checkbox");
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        total += cart[index].price * cart[index].quantity;
      }
    });
    totalDisplay.textContent = total.toFixed(2);
  }

  // ✅ Render cart items
  function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalDisplay.textContent = "0.00";
      return;
    }

    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <input type="checkbox" class="cart-checkbox" data-index="${index}" checked>
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-details">
          <h4>${item.name}</h4>
          <p>₱${item.price}</p>
          <div class="cart-quantity">
            <button class="decrease" data-index="${index}">-</button>
            <input type="number" min="1" value="${item.quantity}" data-index="${index}">
            <button class="increase" data-index="${index}">+</button>
          </div>
        </div>
        <div class="cart-subtotal">₱${subtotal.toFixed(2)}</div>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      cartContainer.appendChild(cartItem);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    calculateTotal();
  }

  // ✅ Update item quantity
  function updateQuantity(index, newQty) {
    if (newQty < 1) return;
    cart[index].quantity = newQty;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  // ✅ Handle button clicks inside the cart
  cartContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("increase")) {
      updateQuantity(index, cart[index].quantity + 1);
    } else if (e.target.classList.contains("decrease")) {
      updateQuantity(index, cart[index].quantity - 1);
    } else if (e.target.classList.contains("remove-btn")) {
      itemToRemoveIndex = index;
      modal.style.display = "flex";
    }
  });

  // ✅ Handle manual number input
  cartContainer.addEventListener("input", (e) => {
    if (e.target.type === "number") {
      const index = e.target.dataset.index;
      updateQuantity(index, parseInt(e.target.value));
    }
  });

  // ✅ Recalculate total when checkbox changes
  cartContainer.addEventListener("change", (e) => {
    if (e.target.classList.contains("cart-checkbox")) {
      calculateTotal();
    }
  });

  // ✅ Confirm remove modal
  confirmRemove.addEventListener("click", () => {
    if (itemToRemoveIndex !== null) {
      cart.splice(itemToRemoveIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
    modal.style.display = "none";
  });

  cancelRemove.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // ✅ Proceed to Checkout button
  checkoutBtn.addEventListener("click", () => {
    const selected = [];
    document.querySelectorAll(".cart-checkbox").forEach((cb, index) => {
      if (cb.checked) selected.push(cart[index]);
    });

    if (selected.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }

    // Save selected items for checkout page
    localStorage.setItem("checkoutItems", JSON.stringify(selected));

    // Redirect to checkout.html
    window.location.href = "checkout.html";
  });

  renderCart();
});
