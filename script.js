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
      addMessage("No response", "bot");
    }
  } catch (error) {
    removeTypingMessage();
    addMessage("Server error.", "bot");
  }
}