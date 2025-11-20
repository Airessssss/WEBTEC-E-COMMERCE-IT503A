// about.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("About page loaded.");

  const aboutText = document.querySelector(".about p");
  if (aboutText) {
    aboutText.style.opacity = "0";
    aboutText.style.transition = "opacity 1.5s ease-in-out";

    setTimeout(() => {
      aboutText.style.opacity = "1";
    }, 300);
  }
});
