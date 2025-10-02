// airport.js

// CORRECTED IMPORT: Assuming utils.js is in the same directory as airport.js
import { showToast } from './utils.js';

/**
 * Sets up the event listener for the airport lookup button.
 */
export function setupAirportLookup() {
  const airportBtn = document.getElementById('lookupAirportBtn');
  // Ensure the button exists before attaching the listener
  if (!airportBtn) {
    console.error("Element with ID 'lookupAirportBtn' not found.");
    return;
  }

  airportBtn.addEventListener('click', async () => {
    const city = document.getElementById('city').value.trim();
    const resultDiv = document.getElementById('airportResult');

    if (!city) {
      showToast('⚠️ Please enter a city.');
      return;
    }
    
    // Simple visual feedback during fetch
    if (resultDiv) {
        resultDiv.innerHTML = '🔍 Searching airport...';
        resultDiv.classList.remove('opacity-0');
        resultDiv.classList.add('opacity-100');
    }

    try {
      const res = await fetch(`/api/airport?city=${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error('Network error or server failed to respond.');
      const data = await res.json();

      if (resultDiv) {
          if (data.airports && data.airports.length > 0) {
            resultDiv.innerHTML = data.airports.map(airport => `
              🛫 <strong>${airport.name}</strong> (${airport.iata})<br>
              📍 ${airport.city}, ${airport.country}
            `).join('<hr class="my-2 border-purple-300 dark:border-purple-800">'); // Styled separator
          } else {
            resultDiv.innerHTML = '❌ No airport found for this city.';
          }
      }

      showToast('✅ Airport lookup complete!');
    } catch (err) {
      if (resultDiv) {
        resultDiv.innerHTML = '❌ Error fetching airport data.';
      }
      showToast('❌ Failed to lookup airport.');
      console.error('Airport Lookup Error:', err);
    }
  });
}
