// main.js - Initializes all modules and sets up global UI elements

// --- Import all necessary functions from your modules ---
import { showToast } from './utils.js';
import { setupTravelTips } from './tips.js';
import { setupFlightStatus } from './status.js';
import { setupWeatherHandler } from './weather.js';
import { setupBookingHandler } from './booking.js';
import { setupAirportLookup } from './airport.js';

/**
 * Ensures all DOM elements are loaded before running setup functions.
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM Content Loaded. Initializing Travel Assistant...');

  // --- Global UI Setup ---
  const dateInput = document.getElementById('date');
  const darkToggle = document.getElementById('darkToggle');

  // Set today's date as default
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  // Dark mode toggle
  if (darkToggle) {
    darkToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark');
      showToast('🌙 Dark mode toggled');
    });
  }

  // --- Initialize Feature Modules ---
  try { setupWeatherHandler(); } catch (err) { console.error('❌ Weather setup failed:', err); }
  try { setupBookingHandler(); } catch (err) { console.error('❌ Booking setup failed:', err); }
  try { setupAirportLookup(); } catch (err) { console.error('❌ Airport lookup setup failed:', err); }
  try { setupTravelTips(); } catch (err) { console.error('❌ Travel tips setup failed:', err); }
  try { setupFlightStatus(); } catch (err) { console.error('❌ Flight status setup failed:', err); }

  console.log('🚀 All modules initialized.');
});
