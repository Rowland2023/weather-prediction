// utils.js

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getAirportCode(city) {
  const codes = {
    Lagos: 'LOS',
    Abuja: 'ABV',
    London: 'LHR',
    'New York': 'JFK',
    Tokyo: 'HND'
  };
  return codes[city] || 'Unknown';
}

export function showResult(id, content) {
  const el = document.getElementById(id);
  el.innerHTML = content;
  el.style.opacity = 1;
}

export function hideResult(id) {
  const el = document.getElementById(id);
  el.style.opacity = 0;
}

export function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

export function showSpinner(targetElement) {
  const spinner = document.createElement("div");
  spinner.className = "spinner";
  targetElement.appendChild(spinner);
}

export function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  } else {
    console.warn('Speech synthesis not supported in this browser.');
  }
}

export const iconMap = {
  Sunny: '☀️',
  Cloudy: '☁️',
  Rain: '🌧️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Fog: '🌫️',
  Windy: '💨',
  Clear: '🌞',
  PartlyCloudy: '⛅',
  Default: '🌍'
};
