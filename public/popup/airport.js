import { showToast } from './utils.js';

export function setupAirportLookup() {
  const airportBtn = document.getElementById('lookupAirportBtn');
  const cityInput = document.getElementById('location');
  const resultDiv = document.getElementById('airportResult');

  if (!airportBtn || !cityInput || !resultDiv) return;

  airportBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return showToast('⚠️ Please enter a city.');

    resultDiv.innerHTML = '🔍 Searching airport...';

    try {
      const res = await fetch(`https://flight-booking-y6l6.onrender.com/api/airport?city=${encodeURIComponent(city)}`, {
        method: 'GET',
        mode: 'cors'
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      resultDiv.innerHTML = data.airports?.length
        ? data.airports.map(a => `🛫 <strong>${a.name}</strong> (${a.iata})<br>📍 ${a.city}, ${a.country}`).join('<hr>')
        : '❌ No airport found for this city.';

      showToast('✅ Airport lookup complete!');
    } catch (err) {
      resultDiv.innerHTML = '❌ Error fetching airport data.';
      showToast('❌ Failed to lookup airport.');
    }
  });
}
