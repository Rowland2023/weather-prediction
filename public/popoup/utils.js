// utils.js

// Toast notification
export function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow text-sm opacity-0 transition-opacity duration-500 z-50';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('opacity-100'), 100);
  setTimeout(() => {
    toast.classList.remove('opacity-100');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Voice assistant
export function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

// Spinner loader
export function showSpinner(targetDiv) {
  targetDiv.innerHTML = '<div class="spinner w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"></div>';
  targetDiv.classList.remove('opacity-0');
  targetDiv.classList.add('opacity-100');
}

// Weather icon mapping
export const iconMap = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Drizzle: '🌦️',
  Haze: '🌁'
};
