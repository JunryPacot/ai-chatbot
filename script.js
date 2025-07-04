async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();
  
  if (!userMessage) return;
  
  addMessage(userMessage, "user");
  input.value = "";
  
  addMessage("Typing...", "bot", true);
  
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    
    const data = await response.json();
    removeTypingMessage();
    
    if (data.reply) {
      addMessage(data.reply, "bot");
    } else {
      addMessage("Bot didn't respond.", "bot");
    }
  } catch (error) {
    removeTypingMessage();
    addMessage("Server error occurred.", "bot");
  }
}

function addMessage(text, sender, isTyping = false) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  if (isTyping) msg.setAttribute("id", "typing");
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingMessage() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}