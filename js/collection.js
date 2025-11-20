document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const buyNowButtons = document.querySelectorAll(".buy-now");
  const showMoreButtons = document.querySelectorAll(".show-more");
  const showLessButtons = document.querySelectorAll(".show-less");
  const bags = document.querySelectorAll(".bag");

  // ✅ Create popup element
  const popup = document.createElement("div");
  popup.className = "popup-message hidden";
  document.body.appendChild(popup);

  // ✅ Show popup function
  function showPopup(message) {
    popup.textContent = message;
    popup.classList.remove("hidden");
    popup.classList.add("visible");

    // Hide after 2 seconds
    setTimeout(() => {
      popup.classList.remove("visible");
      popup.classList.add("hidden");
    }, 2000);
  }

  // ✅ Add to cart logic
 // ✅ Add to cart logic
function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if item already exists in cart
  const existingItem = cart.find(c => c.name === item.name);
  if (existingItem) {
    existingItem.quantity += 1; // Increase quantity if already in cart
    showPopup(`${item.name} quantity updated.`);
  } else {
    item.quantity = 1; // Initialize quantity
    cart.push(item);
    showPopup(`${item.name} added to cart!`);
  }

  // Save updated cart
  localStorage.setItem("cart", JSON.stringify(cart));
}

  // ✅ Add to cart button events
  addToCartButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.stopPropagation();
      const bag = button.closest(".bag");
      const item = {
        name: bag.dataset.name,
        price: parseFloat(bag.dataset.price),
        image: bag.querySelector("img").src
      };
      addToCart(item);
    });
  });

  // ✅ Buy now function
  function buyNow(item) {
    localStorage.setItem("checkoutItems", JSON.stringify([item]));
    window.location.href = "checkout.html";
  }

  // ✅ Buy now button events
  buyNowButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.stopPropagation();
      const bag = button.closest(".bag");
      const item = {
        name: bag.dataset.name,
        price: parseFloat(bag.dataset.price),
        image: bag.querySelector("img").src
      };
      buyNow(item);
    });
  });

  // ✅ Show more / show less logic
  showMoreButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const hiddenProducts = document.querySelectorAll(`#${targetId} .bag.hidden`);

      hiddenProducts.forEach((p, index) => {
        setTimeout(() => {
          p.classList.remove("hidden");
        }, index * 100);
      });

      button.classList.add("hidden");
      document.querySelector(`.show-less[data-target='${targetId}']`).classList.remove("hidden");
    });
  });

  showLessButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const products = document.querySelectorAll(`#${targetId} .bag`);

      products.forEach((p, index) => {
        if (index >= 3) {
          setTimeout(() => {
            p.classList.add("hidden");
          }, index * 100);
        }
      });

      button.classList.add("hidden");
      document.querySelector(`.show-more[data-target='${targetId}']`).classList.remove("hidden");
    });
  });

  // ✅ Redirect to product details on bag click
  bags.forEach(bag => {
    bag.addEventListener("click", () => {
      const item = {
        name: bag.dataset.name,
        price: parseFloat(bag.dataset.price),
        image: bag.querySelector("img").src,
        description: bag.querySelector("p").textContent || ""
      };
      localStorage.setItem("selectedProduct", JSON.stringify(item));
      window.location.href = "product-details.html";
    });
  });
});





const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get("search");

if (searchTerm) {
  const bags = document.querySelectorAll(".bag");
  bags.forEach(bag => {
    const name = bag.dataset.name.toLowerCase();
    bag.style.display = name.includes(searchTerm.toLowerCase()) ? "block" : "none";
  });
}
