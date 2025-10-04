// ✅ Format date into readable string
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// ✅ Get airport code from city name (case-insensitive)
export function getAirportCode(city) {
  const codes = {
    lagos: 'LOS',
    abuja: 'ABV',
    london: 'LHR',
    'new york': 'JFK',
    tokyo: 'HND'
  };
  return codes[city.toLowerCase()] || 'Unknown';
}

// ✅ Show result in target element
export function showResult(id, content) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = content;
    el.style.opacity = 1;
  }
}

// ✅ Hide result from target element
export function hideResult(id) {
  const el = document.getElementById(id);
  if (el) el.style.opacity = 0;
}

// ✅ Show toast notification
export function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ✅ Show loading spinner
export function showSpinner(targetElement) {
  const spinner = document.createElement("div");
  spinner.className = "spinner";
  targetElement.appendChild(spinner);
}

// ✅ Remove spinner after loading
export function removeSpinner(targetElement) {
  const spinner = targetElement.querySelector(".spinner");
  if (spinner) spinner.remove();
}

// ✅ Speak text aloud with accessibility
export function speak(text) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

// ✅ Weather condition icons
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

// ✅ Optional: Icon descriptions for accessibility or tooltips
export const iconDescriptions = {
  Sunny: 'Sunny weather',
  Cloudy: 'Cloudy skies',
  Rain: 'Rainy conditions',
  Thunderstorm: 'Thunderstorm',
  Snow: 'Snowfall',
  Fog: 'Foggy conditions',
  Windy: 'Windy weather',
  Clear: 'Clear skies',
  PartlyCloudy: 'Partly cloudy',
  Default: 'General weather'
};
