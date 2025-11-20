// contact.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Contact page loaded.");

  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("input[type='text']").value;
      const email = form.querySelector("input[type='email']").value;
      const message = form.querySelector("textarea").value;

      if (!name || !email || !message) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      alert(`Thank you, ${name}! Your message has been sent.`);
      form.reset();
    });
  }
});
