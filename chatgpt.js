<!-- Add this code to the Code Block in Squarespace -->
<div id="chat-container">
  <div id="chat-log"></div>
  <input type="text" id="user-input" placeholder="Type your message..." />
  <button id="send-button">Send</button>
</div>

<script>
  // Function to send user input and receive responses from ChatGPT
  async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    document.getElementById('user-input').value = '';

    // Send user input to the OpenAI API
    const response = await fetch('http://e2330602.eero.online:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        prompt: userInput,
        max_tokens: 50, // Adjust the desired response length
        temperature: 0.7 // Adjust the temperature for response randomness
      })
    });

    const data = await response.json();
    const botResponse = data.choices[0].text.trim();

    // Display bot response in the chat log
    const chatLog = document.getElementById('chat-log');
    const userMessage = document.createElement('div');
    userMessage.innerHTML = `<strong>You:</strong> ${userInput}`;
    const botMessage = document.createElement('div');
    botMessage.innerHTML = `<strong>ChatGPT:</strong> ${botResponse}`;
    chatLog.appendChild(userMessage);
    chatLog.appendChild(botMessage);

    // Scroll to the bottom of the chat log
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Event listener for the send button
  document.getElementById('send-button').addEventListener('click', sendMessage);

  // Event listener for the Enter key
  document.getElementById('user-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
</script>
