document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  const productImg = document.getElementById("product-img");
  const productName = document.getElementById("product-name");
  const productPrice = document.getElementById("product-price");
  const totalEl = document.getElementById("total");
  const qtyDisplay = document.getElementById("quantity");

  let quantity = 1;
  const basePrice = product ? parseFloat(product.price) : 0;

  // Load product data
  if (product) {
    productImg.src = product.image;
    productName.textContent = product.name;
    productPrice.textContent = `₱${basePrice.toLocaleString()}`;
    updateTotal();
  }

  function updateTotal() {
    const total = basePrice * quantity;
    totalEl.textContent = total.toLocaleString(undefined, { minimumFractionDigits: 2 });
  }

  document.getElementById("increase").addEventListener("click", () => {
    quantity++;
    qtyDisplay.textContent = quantity;
    updateTotal();
  });

  document.getElementById("decrease").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyDisplay.textContent = quantity;
      updateTotal();
    }
  });

  // Popup message
  const popup = document.createElement("div");
  popup.className = "popup-message hidden";
  document.body.appendChild(popup);

  function showPopup(message) {
    popup.textContent = message;
    popup.classList.remove("hidden");
    popup.classList.add("visible");
    setTimeout(() => {
      popup.classList.remove("visible");
      popup.classList.add("hidden");
    }, 2000);
  }

  // Add to cart
  document.getElementById("add-to-cart").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(c => c.name === product.name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    showPopup(`${product.name} (${quantity}) added to cart!`);
  });

  // Buy now
  document.getElementById("buy-now").addEventListener("click", () => {
    localStorage.setItem("checkoutItems", JSON.stringify([{ ...product, quantity }]));
    window.location.href = "checkout.html";
  });
});
