// airport.js
import { showToast } from './popoup/utils.js';

export function setupAirportLookup() {
  const airportBtn = document.getElementById('lookupAirportBtn');

  airportBtn.addEventListener('click', async () => {
    const city = document.getElementById('city').value.trim();
    const resultDiv = document.getElementById('airportResult');

    if (!city) {
      showToast('⚠️ Please enter a city.');
      return;
    }

    resultDiv.innerHTML = '🔍 Searching airport...';

    try {
      const res = await fetch(`/api/airport?city=${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      if (data.airports && data.airports.length > 0) {
        resultDiv.innerHTML = data.airports.map(airport => `
          🛫 <strong>${airport.name}</strong> (${airport.iata})<br>
          📍 ${airport.city}, ${airport.country}
        `).join('<hr class="my-2">');
      } else {
        resultDiv.innerHTML = '❌ No airport found for this city.';
      }

      showToast('✅ Airport lookup complete!');
    } catch (err) {
      resultDiv.innerHTML = '❌ Error fetching airport data.';
      showToast('❌ Failed to lookup airport.');
      console.error(err);
    }
  });
}
