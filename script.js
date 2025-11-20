const modal = document.getElementById("product-modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const qtyInput = document.getElementById("qty");
const modalTotal = document.getElementById("modal-total");
const closeModal = document.querySelector(".close");
const addToCartBtn = document.getElementById("add-to-cart");

let selectedProduct = null;

// View button click
document.querySelectorAll(".view-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".product-card");
    selectedProduct = {
      name: card.dataset.name,
      price: parseFloat(card.dataset.price),
      img: card.dataset.img,
      qty: 1
    };
    modalImg.src = selectedProduct.img;
    modalName.textContent = selectedProduct.name;
    modalPrice.textContent = `₱${selectedProduct.price.toLocaleString()}`;
    qtyInput.value = 1;
    modalTotal.textContent = `Total: ₱${selectedProduct.price.toLocaleString()}`;
    modal.style.display = "flex";
  });
});

// Quantity update
qtyInput.addEventListener("input", () => {
  if (selectedProduct) {
    selectedProduct.qty = parseInt(qtyInput.value) || 1;
    modalTotal.textContent = `Total: ₱${(selectedProduct.price * selectedProduct.qty).toLocaleString()}`;
  }
});

// Close modal
closeModal.addEventListener("click", () => modal.style.display = "none");

// Cart functionality
let cart = [];
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

addToCartBtn.addEventListener("click", () => {
  if (!selectedProduct) return;
  const existing = cart.find(item => item.name === selectedProduct.name);
  if (existing) {
    existing.qty += selectedProduct.qty;
  } else {
    cart.push({ ...selectedProduct });
  }
  updateCart();
  modal.style.display = "none";
});

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" style="width:60px;height:60px;border-radius:6px;">
      <span>${item.name}</span>
      <input type="number" value="${item.qty}" min="1" data-index="${index}">
      <span>₱${(item.price * item.qty).toLocaleString()}</span>
    `;
    cartItems.appendChild(div);
    total += item.price * item.qty;
  });
  cartTotal.textContent = `Total: ₱${total.toLocaleString()}`;
  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);

  document.querySelectorAll('.cart-item input').forEach(input => {
    input.addEventListener("change", e => {
      const i = e.target.dataset.index;
      cart[i].qty = parseInt(e.target.value) || 1;
      updateCart();
    });
  });
}

// Show more toggle
const showMore = document.getElementById("show-more1");
if (showMore) {
  showMore.addEventListener("click", () => {
    document.querySelectorAll(".hidden1").forEach(i => i.classList.toggle("hidden"));
    showMore.textContent = showMore.textContent === "Show More" ? "Show Less" : "Show More";
  });
}
