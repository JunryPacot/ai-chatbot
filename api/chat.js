export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }
  
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message" });
  
  try {
    console.log("User message:", message);
    
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });
    
    const data = await openaiRes.json();
    console.log("OpenAI response:", data);
    
    const botReply = data?.choices?.[0]?.message?.content;
    
    if (!botReply) {
      return res.status(500).json({ error: "Empty bot reply" });
    }
    
    res.status(200).json({ reply: botReply });
  } catch (err) {
    console.error("Chat API Error:", err);
    res.status(500).json({ error: "Server error" });
  }
}