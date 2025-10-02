// status.js
import { showToast } from './popoup/utils.js';

export function setupFlightStatus() {
  const statusBtn = document.getElementById('getStatusBtn');

  statusBtn.addEventListener('click', async () => {
    const flight = document.getElementById('flightNumber').value.trim();
    const resultDiv = document.getElementById('statusResult');

    if (!flight) {
      showToast('⚠️ Please enter a flight number.');
      return;
    }

    resultDiv.innerHTML = '📡 Checking flight status...';

    try {
      const res = await fetch(`/api/status?flight=${encodeURIComponent(flight)}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      resultDiv.innerHTML = `
        <strong>✈️ Flight:</strong> ${data.flight}<br>
        <strong>🕒 Departure:</strong> ${data.departure}<br>
        <strong>🕒 Arrival:</strong> ${data.arrival}<br>
        <strong>📍 Gate:</strong> ${data.gate}<br>
        <strong>📡 Status:</strong> ${data.status}
      `;
      resultDiv.classList.remove('opacity-0');
      resultDiv.classList.add('opacity-100');
      showToast('✅ Flight status loaded!');
    } catch (err) {
      resultDiv.innerHTML = '❌ Error fetching flight status.';
      showToast('❌ Failed to load flight status.');
      console.error(err);
    }
  });
}
