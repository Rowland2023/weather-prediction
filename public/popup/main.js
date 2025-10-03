// main.js - This file initializes all modules and sets up global UI elements.

// --- Import all necessary functions from your modules ---

// Utility functions and modules - now imported directly from public/
// Note: We removed the './popoup/' prefix as per your clarification.
import { showToast } from './utils.js';
import { setupTravelTips } from './tips.js';
import { setupFlightStatus } from './status.js';

// Feature setup functions located in the public directory root
import { setupWeatherHandler } from './weather.js';
import { setupBookingHandler } from './booking.js';
import { setupAirportLookup } from './airport.js';


/**
 * Use a single document.addEventListener('DOMContentLoaded') block 
 * to ensure all DOM elements are loaded before running setup functions.
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded. Initializing Travel App...');

    // --- 1. Global UI Setup ---
    const dateInput = document.getElementById('date');
    const darkToggle = document.getElementById('darkToggle');

    // Set today's date as default
    if (dateInput) {
        // Ensure date is formatted YYYY-MM-DD
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    // Dark mode toggle handler
    if (darkToggle) {
        darkToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark');
            // This relies on the function imported from './utils.js'
            showToast('🌙 Dark mode toggled'); 
        });
    }

    // --- 2. Initialize All Modules ---
    
    // Initialize primary features (assuming these are the main-screen features)
    setupWeatherHandler();
    setupBookingHandler();

    // Initialize secondary features
    setupAirportLookup();
    setupTravelTips();
    setupFlightStatus();
    
    console.log('All application handlers are set up and running.');
});
