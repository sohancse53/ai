var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');


setTimeout(function() {
    chatbotSendMessage("hey....");
}, 1000);

function chatbotSendMessage(messageText) {
    var messageElement = document.createElement('div');
    messageElement.classList.add('w-50', 'shadow-sm', 'float-left');
    messageElement.style.margin = "10px";
    messageElement.style.padding = "10px";
    messageElement.style.backgroundColor = "#e8e8e8";
    messageElement.style.color = "black";
    messageElement.style.borderRadius = "15px";
    messageElement.style.display = "flex";
    messageElement.style.alignItems = "flex-start";

    const botIcon = document.createElement('img');
    botIcon.src = "https://pics.craiyon.com/2023-06-08/8f12f7763653463289268bdca7185690.webp";
    botIcon.alt = "Chatbot Icon";
    botIcon.style.width = "40px";
    botIcon.style.height = "40px";
    botIcon.style.borderRadius = "50%";
    botIcon.style.marginRight = "10px";
    botIcon.style.flexShrink = "0";

    const textContent = document.createElement('div');
    textContent.style.flexGrow = "1";
    textContent.style.display = "flex";
    textContent.style.flexDirection = "column";

    const botLabel = document.createElement('span');
    botLabel.innerText = "Chatbot:";
    botLabel.style.fontWeight = "bold";
    botLabel.style.marginBottom = "5px";
    botLabel.style.color = "#333333";

    const responseContentWrapper = document.createElement('div');
    responseContentWrapper.style.backgroundColor = "#f0f8ff";
    responseContentWrapper.style.padding = "8px";
    responseContentWrapper.style.borderRadius = "8px";
    responseContentWrapper.style.marginTop = "5px";

    const messageSpan = document.createElement('span');
    messageSpan.innerHTML = messageText.replace(/\n/g, '<br>');
    messageSpan.style.display = "block";
    messageSpan.style.color = "#212529";

    responseContentWrapper.appendChild(messageSpan);

    textContent.appendChild(botLabel);
    textContent.appendChild(responseContentWrapper);

    messageElement.appendChild(botIcon);
    messageElement.appendChild(textContent);

    messageElement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 1000 });
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function chatbotSendImage(imageUrl) {
    var messageElement = document.createElement('div');
    messageElement.classList.add('w-50', 'shadow-sm', 'float-left');
    messageElement.style.margin = "10px";
    messageElement.style.padding = "10px";
    messageElement.style.backgroundColor = "#e8e8e8";
    messageElement.style.color = "black";
    messageElement.style.borderRadius = "15px";
    messageElement.style.display = "flex";
    messageElement.style.alignItems = "flex-start";

    const botIcon = document.createElement('img');
    botIcon.src = "https://pics.craiyon.com/2023-06-08/8f12f7763653463289268bdca7185690.webp";
    botIcon.alt = "Chatbot Icon";
    botIcon.style.width = "40px";
    botIcon.style.height = "40px";
    botIcon.style.borderRadius = "50%";
    botIcon.style.marginRight = "10px";
    botIcon.style.flexShrink = "0";

    const contentContainer = document.createElement('div');
    contentContainer.style.flexGrow = "1";
    contentContainer.style.display = "flex";
    contentContainer.style.flexDirection = "column";

    const botLabel = document.createElement('span');
    botLabel.innerText = "Chatbot:";
    botLabel.style.fontWeight = "bold";
    botLabel.style.marginBottom = "5px";
    botLabel.style.color = "#333333";

    const responseContentWrapper = document.createElement('div');
    responseContentWrapper.style.backgroundColor = "#f0f8ff";
    responseContentWrapper.style.padding = "8px";
    responseContentWrapper.style.borderRadius = "8px";
    responseContentWrapper.style.marginTop = "5px";

    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '100%';
    img.style.borderRadius = '10px';
    img.style.marginTop = '0px';

    responseContentWrapper.appendChild(img);

    contentContainer.appendChild(botLabel);
    contentContainer.appendChild(responseContentWrapper);

    messageElement.appendChild(botIcon);
    messageElement.appendChild(contentContainer);

    messageElement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 1000 });
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendMessage(messageText) {
    var messageElement = document.createElement('div');
    messageElement.classList.add('w-50', 'shadow-sm', 'float-right');
    messageElement.style.margin = "10px";
    messageElement.style.padding = "10px";
    messageElement.style.color = "white";
    messageElement.style.backgroundColor = "#87ceeb";
    messageElement.style.borderRadius = "15px";

    const textContent = document.createElement('div');
    textContent.style.flexGrow = "1";
    textContent.style.display = "flex";
    textContent.style.flexDirection = "column";

    const userLabel = document.createElement('span');
    userLabel.innerText = "You:";
    userLabel.style.fontWeight = "bold";
    userLabel.style.marginBottom = "5px";
    userLabel.style.color = "#1a2b3c";

    const messageSpan = document.createElement('span');
    messageSpan.innerHTML = messageText;
    messageSpan.style.display = "block";
    messageSpan.style.color = "#ffffff";

    textContent.appendChild(userLabel);
    textContent.appendChild(messageSpan);

    messageElement.appendChild(textContent);

    messageElement.animate([{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }], { duration: 1000 });

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    handleChatbotResponse(messageText);
}

async function handleChatbotResponse(prompt) {
    const lowerCasePrompt = prompt.toLowerCase();
    if (lowerCasePrompt.includes('generate image of') || lowerCasePrompt.includes('create picture of') || lowerCasePrompt.includes('draw me')) {
        const imagePrompt = prompt.replace(/^(generate image of|create picture of|draw me)\s*/i, '').trim();
        if (imagePrompt) {
            getImagenResponse(imagePrompt);
        } else {
            chatbotSendMessage("Please specify what image you'd like me to generate. For example: 'generate image of a cat'.");
        }
    } else {
        getGeminiTextResponse(prompt);
    }
}

async function getGeminiTextResponse(prompt) {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('w-50', 'shadow-sm', 'float-left');
    loadingElement.style.margin = "10px";
    loadingElement.style.padding = "10px";
    loadingElement.style.backgroundColor = "#e8e8e8";
    loadingElement.style.color = "black";
    loadingElement.style.borderRadius = "15px";
    loadingElement.innerHTML = "<span>Chatbot:</span><span style='margin-top: 10px; padding: 10px;'>Typing...</span>";
    chatContainer.appendChild(loadingElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = "AIzaSyCUj_n4Hdc0XRZy4cvp-qCTkWkwSbG__7g";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        console.log('Attempting to fetch text from Gemini API...');
        console.log('API Key:', apiKey);
        console.log('API URL:', apiUrl);
        console.log('Payload:', JSON.stringify(payload));


        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Gemini API HTTP Error (Text Gen):', response.status, response.statusText, errorBody);
            chatContainer.removeChild(loadingElement);
            chatbotSendMessage(`Error: Could not get text response. Status: ${response.status}. Please check console for details.`);
            return;
        }

        const result = await response.json();
        console.log('Gemini API raw text response:', result);

        chatContainer.removeChild(loadingElement);

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            chatbotSendMessage(text);
        } else {
            console.warn("Gemini API text response structure unexpected or missing content:", result);
            chatbotSendMessage("I'm sorry, I couldn't get a meaningful text response from Gemini.");
        }
    } catch (error) {
        chatContainer.removeChild(loadingElement);
        console.error("Error fetching text from Gemini API:", error.message, error);
        chatbotSendMessage("I'm sorry, there was an error connecting to the chatbot for text generation. Please check your network connection and browser console.");
    }
}

async function getImagenResponse(prompt) {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('w-50', 'shadow-sm', 'float-left');
    loadingElement.style.margin = "10px";
    loadingElement.style.padding = "10px";
    loadingElement.style.backgroundColor = "#e8e8e8";
    loadingElement.style.color = "black";
    loadingElement.style.borderRadius = "15px";
    loadingElement.innerHTML = "<span>Chatbot:</span><span style='margin-top: 10px; padding: 10px;'>Generating image...</span>";
    chatContainer.appendChild(loadingElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        const payload = { instances: { prompt: prompt }, parameters: { "sampleCount": 1 } };
        const apiKey = "AIzaSyCUj_n4Hdc0XRZy4cvp-qCTkWkwSbG__7g";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

        console.log('Attempting to fetch image from Imagen API...');
        console.log('API Key:', apiKey);
        console.log('API URL:', apiUrl);
        console.log('Payload:', JSON.stringify(payload));

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Imagen API HTTP Error (Image Gen):', response.status, response.statusText, errorBody);
            chatContainer.removeChild(loadingElement);
            chatbotSendMessage(`Error: Could not generate image. Status: ${response.status}. Please check console for details.`);
            return;
        }

        const result = await response.json();
        console.log('Imagen API raw response:', result);

        chatContainer.removeChild(loadingElement);

        if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
            const imageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
            chatbotSendImage(imageUrl);
        } else {
            console.warn("Imagen API response structure unexpected or missing image data:", result);
            chatbotSendMessage("I'm sorry, I couldn't generate an image with that prompt.");
        }

    } catch (error) {
        chatContainer.removeChild(loadingElement);
        console.error("Error fetching image from Imagen API:", error.message, error);
        chatbotSendMessage("I'm sorry, there was an error connecting to the image generation service. Please check your network connection and browser console.");
    }
}

sendBtn.addEventListener('click', function(e) {
    if (textbox.value === "") {
        showCustomAlert("Please type in a message.");
    } else {
        let messageText = textbox.value;
        sendMessage(messageText);
        textbox.value = "";
    }
});

textbox.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendBtn.click();
    }
});

function showCustomAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.backgroundColor = '#fff';
    alertBox.style.padding = '20px';
    alertBox.style.borderRadius = '10px';
    alertBox.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    alertBox.style.zIndex = '1000';
    alertBox.style.textAlign = 'center';
    alertBox.style.fontFamily = 'Arial, sans-serif';
    alertBox.style.color = '#333';
    alertBox.style.maxWidth = '300px';

    const alertText = document.createElement('p');
    alertText.innerText = message;
    alertText.style.marginBottom = '15px';

    const closeButton = document.createElement('button');
    closeButton.innerText = 'OK';
    closeButton.style.backgroundColor = 'cornflowerblue';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.padding = '10px 20px';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => document.body.removeChild(alertBox);

    alertBox.appendChild(alertText);
    alertBox.appendChild(closeButton);
    document.body.appendChild(alertBox);
}

var loader = document.getElementById("loader");
window.addEventListener("load", function() {
    setTimeout(function() {
        loader.style.display = "none"
    }, 1200)
})
