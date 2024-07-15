// Select the button with class 'talk' and store it in the variable 'btn'
const btn = document.querySelector('.talk');

// Select the element with class 'content' and store it in the variable 'content'
const content = document.querySelector('.content');

// Variable to track if the voice recognition is active
let isActive = false;

// Function to convert text to speech
function Speak(sentence) {
    // Create a new SpeechSynthesisUtterance instance with the given sentence
    const text_speak = new SpeechSynthesisUtterance(sentence);
    
    // Set the rate (speed) of the speech
    text_speak.rate = 1;
    
    // Set the pitch (tone) of the speech
    text_speak.pitch = 1;
    
    // Speak the text using the speech synthesis API
    window.speechSynthesis.speak(text_speak);
}

// Add an event listener to the button that activates on click
btn.addEventListener('click', () => {
    // Check if voice recognition is active
    if (isActive) {
        // If active, greet the user
        Speak('Hello, how can I help you today?');
        
        try {
            // Try to start voice recognition
            recognition.start();
        } catch (error) {
            // If an error occurs, notify the user
            Speak('An error occurred while trying to access the microphone. Please check your microphone settings and try again.');
        }
    } else {
        // If voice recognition is not active, notify the user
        Speak('Voice recognition is not activated.');
    }
});

// Function to greet the user based on the time of day
function wishMe() {
    // Get the current date and time
    const day = new Date();
    
    // Get the current hour
    const hr = day.getHours();

    // Greet the user based on the hour
    if (hr >= 0 && hr < 12) {
        Speak("Good Morning");
    } else if (hr === 12) {
        Speak("Good Noon");
    } else if (hr > 12 && hr < 18) {
        Speak("Good Afternoon");
    } else {
        Speak("Good Evening");
    }
}

// Call the wishMe function to greet the user
wishMe();

// Function to start voice recognition
function startVR() {
    // Set isActive to true
    isActive = true;
    
    // Notify the user that voice recognition is activated
    Speak('Voice recognition activated.');
}

// Function to stop voice recognition
function stopVR() {
    // Set isActive to false
    isActive = false;
    
    // Notify the user that voice recognition is deactivated
    Speak('Voice recognition deactivated.');
}

// Add event listeners for the startVR and stopVR functions
document.querySelector('.start-vr').addEventListener('click', startVR);
document.querySelector('.stop-vr').addEventListener('click', stopVR);

// Check if the browser supports SpeechRecognition or webkitSpeechRecognition and create a new instance
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Event handler for when the voice recognition results are returned
recognition.onresult = (event) => {
    // Get the index of the current result
    const current = event.resultIndex;
    
    // Get the transcript of what was said
    const transcript = event.results[current][0].transcript;
    
    // Display the transcript in the content element
    content.textContent = transcript;
    
    // Call the speakThis function with the lowercase transcript
    speakThis(transcript.toLowerCase());
};

// Function to respond to the user's voice commands
function speakThis(message) {
    // Create a new SpeechSynthesisUtterance instance
    const speech = new SpeechSynthesisUtterance();
    
    // Default response if the message is not recognized
    speech.text = "I did not understand what you said, please try again.";

    // Respond to various voice commands
    if (message.includes('hey') || message.includes('hello')) {
        const finalText = "Hello";
        speech.text = finalText;
    } else if (message.includes('how are you')) {
        const finalText = "I am fine. Let me know what I can do for you.";
        speech.text = finalText;
    } else if (message.includes('tell me a story')) {
        const finalText = "An anthology of iconic and popular fairy tales reimagined as dark stories centered around murder, revenge, greed and grief.";
        speech.text = finalText;
    } else if (message.includes('open google')) {
        window.open("https://www.google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    } else if (message.includes('open instagram')) {
        window.open("https://www.instagram.com", "_blank");
        const finalText = "Opening Instagram";
        speech.text = finalText;
    } else if (message.includes('Who is Haseeb')) {
        const finalText = "Haseeb is aik acha larka he";
        speech.text = finalText;
    } else if (message.includes("open Vs code")) {
        const finalText = "Opening Vs Code";
        speech.text = finalText;
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speech.text = finalText;
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim().replace(/ /g, "_")}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speech.text = finalText;
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        const finalText = "I found some information for " + message;
        speech.text = finalText;
    }

    // Set the volume, pitch, and rate of the speech
    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    // Speak the text using the speech synthesis API
    window.speechSynthesis.speak(speech);
}
