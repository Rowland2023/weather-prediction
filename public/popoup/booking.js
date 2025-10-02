// booking.js
import { showToast, speak, showSpinner } from './utils.js';

export function setupBookingHandler() {
  const bookBtn = document.getElementById('bookFlightBtn');

  bookBtn.addEventListener('click', async () => {
    const location = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;
    const resultDiv = document.getElementById('bookingResult');
    const mapFrame = document.getElementById('mapFrame');

    if (!location || !date) {
      showToast('⚠️ Please enter destination and date.');
      return;
    }

    showSpinner(resultDiv);

    try {
      const res = await fetch('/api/book-flight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, date })
      });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      const details = data.details || {};

      resultDiv.innerHTML = `
        ✅ ${data.confirmation}<br>
        ✈️ ${details.flight}<br>
        Departure: ${details.departure}<br>
        Arrival: ${details.arrival}
      `;
      resultDiv.classList.remove('opacity-0');
      resultDiv.classList.add('opacity-100');

      mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;

      showToast('✅ Flight booked!');
      speak(`Your flight to ${location} is confirmed for ${date}.`);
    } catch (err) {
      resultDiv.innerHTML = '❌ Error booking flight.';
      resultDiv.classList.remove('opacity-0');
      resultDiv.classList.add('opacity-100');
      showToast('❌ Failed to book flight.');
      console.error(err);
    }
  });
}
