import { showToast, speak, showSpinner } from './utils.js';

export function setupBookingHandler() {
  const bookBtn = document.getElementById('bookFlightBtn');
  if (!bookBtn) return;

  bookBtn.addEventListener('click', async () => {
    const location = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;
    const resultDiv = document.getElementById('bookingResult');

    if (!location || !date) return showToast('⚠️ Please enter destination and date.');
    if (resultDiv) showSpinner(resultDiv);

    try {
      const res = await fetch('https://flight-booking-y6l6.onrender.com/api/book-flight', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, date })
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      const details = data.details || {};

      resultDiv.innerHTML = `
        ✅ ${data.confirmation || 'Booking Confirmed'}<br>
        ✈️ ${details.flight || 'TBA'}<br>
        Departure: ${details.departure || 'N/A'}<br>
        Arrival: ${details.arrival || 'N/A'}
      `;
      showToast('✅ Flight booked!');
      speak(`Your flight to ${location} is confirmed for ${date}.`);
    } catch (err) {
      resultDiv.innerHTML = '❌ Error booking flight.';
      showToast('❌ Failed to book flight.');
    }
  });
}
