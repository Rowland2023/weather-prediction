// public/utils.js

// --- TOAST NOTIFICATION ---

/**
 * Displays a non-blocking toast notification.
 * This function creates a new toast element for each message.
 * @param {string} message The message to display.
 */
export function showToast(message) {
    // Cleanup any existing toast immediately
    document.querySelectorAll('.toast-notification').forEach(t => t.remove());

    const toast = document.createElement('div');
    // Using a class for easier targeting, and consistent, attractive Tailwind styling
    toast.className = 'toast-notification fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-purple-600 text-white px-5 py-3 rounded-xl shadow-2xl opacity-0 transition-opacity duration-300 z-50 text-base font-semibold max-w-xs text-center';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast after a slight delay to ensure transition works
    setTimeout(() => toast.classList.add('opacity-100'), 50);

    // Hide and remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        // Wait for the transition duration (300ms) before removing the element
        setTimeout(() => toast.remove(), 350);
    }, 3000);
}

// --- VOICE ASSISTANT ---

/**
 * Uses the Web Speech API to read the given text aloud.
 * @param {string} text The text to speak.
 */
export function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        // Using a standard US English voice
        utterance.lang = 'en-US'; 
        speechSynthesis.speak(utterance);
    } else {
        showToast("Speech synthesis is not supported in this browser.");
    }
}

// --- LOADING SPINNER ---

/**
 * Displays a spinner loader inside the target div and makes it visible.
 * @param {HTMLElement} targetDiv The result container where the spinner should be displayed.
 */
export function showSpinner(targetDiv) {
    if (!targetDiv) return;
    targetDiv.innerHTML = '<div class="spinner w-6 h-6 border-4 border-gray-300 border-t-purple-500 rounded-full animate-spin mx-auto my-4"></div><p class="text-sm dark:text-gray-400">Loading...</p>';
    targetDiv.classList.remove('opacity-0');
    targetDiv.classList.add('opacity-100');
}

/**
 * Hides the spinner by clearing the target div content and setting opacity to 0.
 * @param {HTMLElement} targetDiv The result container to clear.
 */
export function hideSpinner(targetDiv) {
    if (!targetDiv) return;
    targetDiv.classList.remove('opacity-100');
    targetDiv.classList.add('opacity-0');
    // Clear content after hiding animation
    setTimeout(() => targetDiv.innerHTML = '', 300); 
}

// --- DARK MODE TOGGLE ---

/**
 * Initializes the dark mode toggle functionality using localStorage.
 */
export function setupDarkMode() {
    const darkToggle = document.getElementById('darkToggle');
    if (!darkToggle) return; 
    
    // Check local storage for dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Apply initial state
    if (isDarkMode || window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        darkToggle.checked = true;
        localStorage.setItem('darkMode', 'true');
    } else {
        document.documentElement.classList.remove('dark');
        darkToggle.checked = false;
        localStorage.setItem('darkMode', 'false');
    }

    // Set up change listener
    darkToggle.addEventListener('change', () => {
        if (darkToggle.checked) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
            showToast('🌚 Switched to Dark Mode');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
            showToast('☀️ Switched to Light Mode');
        }
    });
}

// --- DATA MAPPING ---

/**
 * Map for converting weather condition strings to emojis.
 */
export const iconMap = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Drizzle: '🌦️',
    Haze: '🌁',
    Fog: '🌫️',
    Smoke: '💨',
    Tornado: '🌪️',
    Squall: '🌬️'
};
