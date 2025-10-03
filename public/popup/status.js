// status.js

import { showToast } from './utils.js';

/**
 * Sets up the event listener for the flight status button.
 */
export function setupFlightStatus() {
  const statusBtn = document.getElementById('getStatusBtn');
  const flightInput = document.getElementById('flightNumber');
  const resultDiv = document.getElementById('statusResult');

  // Defensive checks
  if (!statusBtn) {
    console.error("Element with ID 'getStatusBtn' not found.");
    return;
  }
  if (!flightInput) {
    console.error("Element with ID 'flightNumber' not found.");
    return;
  }
  if (!resultDiv) {
    console.warn("Element with ID 'statusResult' not found.");
  }

  statusBtn.addEventListener('click', async () => {
    const flight = flightInput.value.trim();

    if (!flight) {
      showToast('⚠️ Please enter a flight number.');
      return;
    }

    if (resultDiv) {
      resultDiv.innerHTML = '📡 Checking flight status...';
      resultDiv.classList.remove('opacity-0');
      resultDiv.classList.add('opacity-100');
    }

    try {
      const res = await fetch(`/api/status?flight=${encodeURIComponent(flight)}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      if (resultDiv) {
        resultDiv.innerHTML = `
          <strong>✈️ Flight:</strong> ${data.flight}<br>
          <strong>🕒 Departure:</strong> ${data.departure}<br>
          <strong>🕒 Arrival:</strong> ${data.arrival}<br>
          <strong>📍 Gate:</strong> ${data.gate}<br>
          <strong>📡 Status:</strong> ${data.status}
        `;
      }

      showToast('✅ Flight status loaded!');
    } catch (err) {
      if (resultDiv) {
        resultDiv.innerHTML = '❌ Error fetching flight status.';
      }
      showToast('❌ Failed to load flight status.');
      console.error('Flight Status Error:', err);
    }
  });
}
