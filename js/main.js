// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Bella Borsa Home loaded.");

  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `search.html?search=${encodeURIComponent(query)}`;
        } else {
          alert("Please enter a search term.");
        }
      }
    });
  }
});



// ===== Slideshow with Dots =====
let slideIndex = 0;

function showSlides() {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");

  setTimeout(showSlides, 4000); // Change image every 4 seconds
}

document.addEventListener("DOMContentLoaded", () => {
  showSlides();

  // Allow clicking dots manually
  const dots = document.getElementsByClassName("dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", () => {
      slideIndex = parseInt(dots[i].dataset.index) - 1;
      const slides = document.getElementsByClassName("slide");
      for (let j = 0; j < slides.length; j++) slides[j].style.display = "none";
      for (let j = 0; j < dots.length; j++) dots[j].classList.remove("active");
      slides[slideIndex].style.display = "block";
      dots[slideIndex].classList.add("active");
    });
  }
});
