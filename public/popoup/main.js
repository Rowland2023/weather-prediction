// main.js
import { showToast } from './utils.js';
import { setupWeatherHandler } from './weather.js';
import { setupBookingHandler } from './booking.js';
import { setupWeatherHandler } from './weather.js';
import { setupBookingHandler } from './booking.js';
import { setupAirportLookup } from './airport.js';
import { setupTravelTips } from './tips.js';
import { setupFlightStatus } from './status.js';

document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('date');
  const darkToggle = document.getElementById('darkToggle');

  // Set today's date as default
  dateInput.value = new Date().toISOString().split('T')[0];

  // Dark mode toggle
  darkToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    showToast('🌙 Dark mode toggled');
  });

  // Initialize modules
  setupWeatherHandler();
  setupBookingHandler();
});
//
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('date').value = new Date().toISOString().split('T')[0];
  document.getElementById('darkToggle').addEventListener('change', () => {
    document.body.classList.toggle('dark');
    showToast('🌙 Dark mode toggled');
  });

  setupWeatherHandler();
  setupBookingHandler();
  setupAirportLookup();
  setupTravelTips();
});

//

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('date').value = new Date().toISOString().split('T')[0];
  document.getElementById('darkToggle').addEventListener('change', () => {
    document.body.classList.toggle('dark');
    showToast('🌙 Dark mode toggled');
  });

  setupWeatherHandler();
  setupBookingHandler();
  setupAirportLookup();
  setupTravelTips();
  setupFlightStatus();
});
