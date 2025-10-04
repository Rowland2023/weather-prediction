import { showToast } from './utils.js';

export function setupFlightStatus() {
  const statusBtn = document.getElementById('checkStatusBtn');
  const flightInput = document.getElementById('flightNumber');
  const resultDiv = document.getElementById('statusResult');

  if (!statusBtn || !flightInput || !resultDiv) return;

  statusBtn.addEventListener('click', async () => {
    const flight = flightInput.value.trim();
    if (!flight) return showToast('⚠️ Please enter a flight number.');

    resultDiv.innerHTML = '📡 Checking flight status...';

    try {
      const res = await fetch(`https://flight-booking-y6l6.onrender.com/api/status?flight=${encodeURIComponent(flight)}`, {
        method: 'GET',
        mode: 'cors'
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      resultDiv.innerHTML = `
        <strong>✈️ Flight:</strong> ${data.flight}<br>
        <strong>🕒 Departure:</strong> ${data.departure}<br>
        <strong>🕒 Arrival:</strong> ${data.arrival}<br>
        <strong>📍 Gate:</strong> ${data.gate}<br>
        <strong>📡 Status:</strong> ${data.status}
      `;
      showToast('✅ Flight status loaded!');
    } catch (err) {
      resultDiv.innerHTML = '❌ Error fetching flight status.';
      showToast('❌ Failed to load flight status.');
    }
  });
}
