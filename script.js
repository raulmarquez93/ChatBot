
document.addEventListener('DOMContentLoaded', () => {
    const chatHistory = document.getElementById('chatHistory');
    const questionInput = document.getElementById('question');
    const askButton = document.getElementById('askButton');
    const clearButton = document.getElementById('clearButton');

    // Cargar mensajes guardados en Local Storage al cargar la página
    loadChatHistory();

    // Función para enviar la pregunta y obtener la respuesta del servidor
    async function askQuestion(question, language) {
        try {
            // Enviar la pregunta al backend
            const response = await fetch('http://127.0.0.1:5000/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: question,  // Pregunta
                    language: language   // Idioma
                })
            });

            const data = await response.json();

            if (data.answer) {
                // Si el servidor devuelve una respuesta
                addMessageToChat(question, data.answer);
            } else {
                // Si no hay respuesta del servidor
                addMessageToChat(question, "Sorry, I couldn't find an answer.");
            }
        } catch (error) {
            console.error(error);
            addMessageToChat(question, "Error connecting to the server.");
        }
    }

    // Función para agregar un mensaje al historial de chat
    function addMessageToChat(question, answer) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');

        // Crear y agregar el mensaje de la pregunta
        const questionElement = document.createElement('p');
        questionElement.classList.add('question');
        questionElement.textContent = `You: ${question}`;
        messageContainer.appendChild(questionElement);

        // Crear y agregar el mensaje de la respuesta
        const answerElement = document.createElement('p');
        answerElement.classList.add('answer');
        answerElement.textContent = `Bot: ${answer}`;
        messageContainer.appendChild(answerElement);

        // Añadir el contenedor al historial de chat
        chatHistory.appendChild(messageContainer);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Desplazar hacia abajo
        saveChatHistory(); // Guardar el historial en Local Storage
    }

    // Event listener para el botón de consulta
    askButton.addEventListener('click', function () {
        const question = questionInput.value.trim();
        const language = document.getElementById('language').value; // Obtener el idioma seleccionado

        if (question === "") {
            alert("Please enter a question.");
            return;
        }

        // Llamar a la función askQuestion
        askQuestion(question, language);

        // Limpiar el campo de entrada después de hacer la pregunta
        questionInput.value = "";
    });

    // Función para limpiar el chat
    clearButton.addEventListener('click', () => {
        chatHistory.innerHTML = ''; // Limpiar el historial del chat visualmente
        localStorage.removeItem('chatHistory'); // Eliminar del Local Storage
    });

    // Guardar historial de chat en Local Storage
    function saveChatHistory() {
        const messages = Array.from(chatHistory.children).map(container => ({
            question: container.querySelector('.question').textContent,
            answer: container.querySelector('.answer').textContent
        }));
        localStorage.setItem('chatHistory', JSON.stringify(messages));
    }

    // Cargar historial de chat desde Local Storage
    function loadChatHistory() {
        const savedMessages = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        savedMessages.forEach(msg => {
            addMessageToChat(msg.question.replace('You: ', ''), msg.answer.replace('Bot: ', ''));
        });
    }
    
// Objeto con las traducciones en diferentes idiomas
const translations = {
    en: {
        title: "Chatbot About Raul",
        intro: "Hello! I'm a chatbot that will help you learn more about Raul.",
        intro2: "Ask me a short and concise question!",
        selectLabel: "Select Language:",
        send: "Send",
        clear: "Clear chat"
    },
    es: {
        title: "Chatbot Sobre Raul",
        intro: "¡Hola! Soy un chatbot que te ayudará a conocer más sobre Raul.",
        intro2: "¡Hazme una pregunta corta y clara!",
        selectLabel: "Selecciona Idioma:",
        send: "Enviar",
        clear: "Limpiar chat"
    },
    ca: {
        title: "Xatbot Sobre Raül",
        intro: "Hola! Sóc un xatbot que t'ajudarà a conéixer més sobre Raül.",
        intro2: "Fes-me una pregunta curta i clara!",
        selectLabel: "Selecciona Idioma:",
        send: "Enviar val",
        clear: "Neteja xat"
    }
};


function updateLanguage(language) {
    // Seleccionar todos los elementos con la clase 'language-text'
    document.querySelectorAll('.language-text').forEach(element => {
        // Obtener la clave de data-key
        const key = element.getAttribute('data-key');
        // Cambiar el texto solo si hay una traducción disponible
        if (translations[language][key]) {
            element.innerHTML = translations[language][key];
        }
    });
}

// Agregar un evento al selector de idioma
document.getElementById('language').addEventListener('change', (event) => {
    updateLanguage(event.target.value);
});


});