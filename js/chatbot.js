document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatbot = document.getElementById("chatbot-widget");
  const closeBtn = document.getElementById("chatbot-close");
  const sendBtn = document.getElementById("chatbot-send");
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");

  // Show/hide chatbot
  toggleBtn.addEventListener("click", () => {
    chatbot.classList.add("active");
    toggleBtn.style.display = "none";
  });

  closeBtn.addEventListener("click", () => {
    chatbot.classList.remove("active");
    toggleBtn.style.display = "block";
  });

  // Add message to chat
  function addMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.innerHTML = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  // Quick replies template
  function addQuickReplies(replies) {
    const container = document.createElement("div");
    container.classList.add("quick-replies");
    replies.forEach(reply => {
      const btn = document.createElement("button");
      btn.textContent = reply;
      btn.addEventListener("click", () => handleUserInput(reply));
      container.appendChild(btn);
    });
    messages.appendChild(container);
    messages.scrollTop = messages.scrollHeight;
  }

  // Define chatbot logic
  function getBotReply(message) {
    const msg = message.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      addQuickReplies(["View Collection", "Check Cart", "Contact Support"]);
      return "Hello! 👋 How can I assist you today?";
    } 
    if (msg.includes("price") || msg.includes("cost")) {
      return "All product prices are displayed in the Collection page. You can check there!";
    }
    if (msg.includes("bag") || msg.includes("tote") || msg.includes("crossbody") || msg.includes("satchel")) {
      return "We have a wide variety of bags! You can browse them on our Collection page.";
    }
    if (msg.includes("cart")) {
      return "You can view your cart by clicking the Cart icon at the top right of the page.";
    }
    if (msg.includes("contact") || msg.includes("support")) {
      return "You can reach us on our Contact page, or leave a message here!";
    }
    if (msg.includes("thanks") || msg.includes("thank you")) {
      return "You're welcome! 😊";
    }
    if (msg.includes("view collection")) {
      window.open("collection.html", "_blank");
      return "Opening Collection page for you!";
    }
    if (msg.includes("check cart")) {
      window.open("cart.html", "_blank");
      return "Opening your cart!";
    }
    return "I’m here to help! Can you please rephrase your question?";
  }

  function handleUserInput(text) {
    addMessage(text, "user");
    input.value = "";
    setTimeout(() => {
      const reply = getBotReply(text);
      addMessage(reply, "bot");
    }, 500);
  }

  sendBtn.addEventListener("click", () => handleUserInput(input.value.trim()));
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserInput(input.value.trim());
  });
});
