// Created by Suman Regmi
// On 2025/5/11

const voicesSelect = document.getElementById('voices');
const recognizedText = document.getElementById('recognizedText');
let voices = [];
let recognition;

// Populate voices dropdown
function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voicesSelect.appendChild(option);
    });
}

speechSynthesis.onvoiceschanged = populateVoices;
populateVoices();

// Text to Speech functionality
function speakText() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }

    const text = recognizedText.value.trim();
    if (!text) {
        showToast('Please enter some text to speak', 'error');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[voicesSelect.value];
    utterance.rate = parseFloat(document.getElementById('rate').value);
    utterance.pitch = parseFloat(document.getElementById('pitch').value);

    utterance.onstart = function () {
        document.getElementById('speakingStatus').classList.remove('hidden');
    };

    utterance.onend = function () {
        document.getElementById('speakingStatus').classList.add('hidden');
    };

    speechSynthesis.speak(utterance);
    showToast('Speaking...');
}

// Stop speaking
function stopSpeaking() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        document.getElementById('speakingStatus').classList.add('hidden');
        showToast('Speech stopped');
    }
}

// Speech recognition functionality
function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Your browser does not support Speech Recognition.");
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Show status indicators
    document.getElementById('statusIndicator').classList.remove('hidden');
    document.getElementById('startBtn').classList.add('hidden');
    document.getElementById('stopBtn').classList.remove('hidden');

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        recognizedText.value += (recognizedText.value ? " " : "") + transcript;
    };

    recognition.onerror = function (event) {
        recognizedText.value += "\nError: " + event.error;
        stopListening();
    };

    recognition.onend = function () {
        document.getElementById('statusIndicator').classList.add('hidden');
        document.getElementById('startBtn').classList.remove('hidden');
        document.getElementById('stopBtn').classList.add('hidden');
    };

    recognition.start();
    showToast('Listening started');
}

// Stop listening
function stopListening() {
    if (recognition) {
        recognition.stop();
        document.getElementById('statusIndicator').classList.add('hidden');
        document.getElementById('startBtn').classList.remove('hidden');
        document.getElementById('stopBtn').classList.add('hidden');
        showToast('Listening stopped');
    }
}

// Reset text area
function resetText() {
    recognizedText.value = "";
    showToast('Text cleared');
}

// Copy text to clipboard
function copyText() {
    recognizedText.select();
    document.execCommand('copy');
    showToast('Text copied to clipboard!');
}

// Update slider value displays
document.getElementById('rate').addEventListener('input', function () {
    document.getElementById('rateValue').textContent = this.value;
});

document.getElementById('pitch').addEventListener('input', function () {
    document.getElementById('pitchValue').textContent = this.value;
});

// Toast notifications
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2';
        document.body.appendChild(toastContainer);
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transform transition-all duration-300 ease-out translate-x-full opacity-0 ${type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`;

    // Icon based on type
    const icon = document.createElement('span');
    icon.innerHTML = type === 'error'
        ? '<i class="fas fa-exclamation-circle text-red-600"></i>'
        : '<i class="fas fa-check-circle text-green-600"></i>';


    // Message
    const messageEl = document.createElement('span');
    messageEl.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(messageEl);
    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
    }, 10);

    // Remove after delay
    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Check for browser compatibility
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        document.getElementById('startBtn').disabled = true;
        document.getElementById('startBtn').classList.add('bg-gray-400');
        document.getElementById('startBtn').classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
    }

    if (!('speechSynthesis' in window)) {
        document.querySelector('button[onclick="speakText()"]').disabled = true;
        document.querySelector('button[onclick="speakText()"]').classList.add('bg-gray-400');
        document.querySelector('button[onclick="speakText()"]').classList.remove('bg-green-600', 'hover:bg-green-700');
    }
});