document.addEventListener("DOMContentLoaded", () => {
  const checkoutItems = JSON.parse(localStorage.getItem("checkoutItems"));

  if (!checkoutItems || checkoutItems.length === 0) {
    alert("No products selected for checkout.");
    window.location.href = "cart.html";
    return;
  }

  const productContainer = document.querySelector(".product-details");
  productContainer.innerHTML = ""; // Clear template

  let totalPrice = 0;

  checkoutItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("checkout-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="info">
        <h3>${item.name}</h3>
        <p>${item.description || ""}</p>
        <p><strong>₱${item.price.toLocaleString()}</strong></p>
        
        <div class="quantity-box">
          <button class="decrease" data-index="${index}">−</button>
          <span>${item.quantity || 1}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>

        <p class="item-total">Total: ₱${(item.price * (item.quantity || 1)).toLocaleString()}</p>
      </div>
    `;
    productContainer.appendChild(div);
    totalPrice += item.price * (item.quantity || 1);
  });

  // Add total display
  const totalDiv = document.createElement("h3");
  totalDiv.id = "checkout-total";
  totalDiv.textContent = `Grand Total: ₱${totalPrice.toLocaleString()}`;
  totalDiv.style.textAlign = "center";
  totalDiv.style.marginTop = "15px";
  productContainer.appendChild(totalDiv);

  // Quantity button logic
  productContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase") || e.target.classList.contains("decrease")) {
      const index = e.target.dataset.index;
      const item = checkoutItems[index];
      const quantitySpan = e.target.parentElement.querySelector("span");

      if (e.target.classList.contains("increase")) {
        item.quantity = (item.quantity || 1) + 1;
      } else if (e.target.classList.contains("decrease") && item.quantity > 1) {
        item.quantity -= 1;
      }

      quantitySpan.textContent = item.quantity;
      const itemTotal = e.target.closest(".info").querySelector(".item-total");
      itemTotal.textContent = `Total: ₱${(item.price * item.quantity).toLocaleString()}`;

      // Update grand total
      let newTotal = checkoutItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      document.getElementById("checkout-total").textContent = `Grand Total: ₱${newTotal.toLocaleString()}`;
    }
  });

  // Handle form submission
  const checkoutForm = document.getElementById("checkout-form");
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value;

    if (!name || !email || !address || !payment) {
      alert("Please fill out all fields.");
      return;
    }

    // Show custom popup
    const popup = document.getElementById("successPopup");
    const popupMessage = document.getElementById("popupMessage");
    popupMessage.textContent = `Thank you, ${name}! Your order has been placed successfully.`;
    popup.style.display = "flex";

    // Wait for user to click OK
    document.getElementById("popupCloseBtn").addEventListener("click", () => {
      popup.style.display = "none";
      localStorage.removeItem("checkoutItems");
      window.location.href = "index.html";
    });
  });
});
