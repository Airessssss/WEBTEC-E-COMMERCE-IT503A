// js/search.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search")?.toLowerCase();
  const title = document.getElementById("search-title");
  const resultsContainer = document.getElementById("results-container");

  // Example data (replace this with your actual products or from localStorage)
  const products = [
    { name: "Chanel Classic Flap", price: "₱250,000", image: "image/chanel.jpg" },
    { name: "Hermès Birkin 30", price: "₱900,000", image: "image/hermes.jpg" },
    { name: "Louis Vuitton Speedy 25", price: "₱120,000", image: "image/lv.jpg" },
    { name: "Dior Lady Dior", price: "₱230,000", image: "image/dior.jpg" },
  ];

  if (!searchTerm) {
    title.textContent = "Please enter a search term.";
    return;
  }

  title.textContent = `Search results for: "${searchTerm}"`;

  // Filter matching items
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));

  if (filtered.length === 0) {
    resultsContainer.innerHTML = `<p>No products found.</p>`;
    return;
  }

  filtered.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("result-item");
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
    `;
    resultsContainer.appendChild(item);
  });
});
