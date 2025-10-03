// booking.js

// CORRECTED IMPORT: Now imports directly from the sibling file utils.js in the public directory.
import { showToast, speak, showSpinner } from './utils.js';

/**
 * Sets up the event listener for the flight booking button.
 * Assumes all utility functions (showToast, speak, showSpinner) are available in './utils.js'.
 */
export function setupBookingHandler() {
  const bookBtn = document.getElementById('bookFlightBtn');

  // Ensure the button exists before attaching the listener
  if (!bookBtn) {
    console.error("Element with ID 'bookFlightBtn' not found.");
    return;
  }

  bookBtn.addEventListener('click', async () => {
    const location = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;
    const resultDiv = document.getElementById('bookingResult');
    const mapFrame = document.getElementById('mapFrame');

    if (!location || !date) {
      showToast('⚠️ Please enter destination and date.');
      return;
    }

    // Check if the result container is available before showing the spinner
    if (resultDiv) {
        showSpinner(resultDiv);
    } else {
        // If resultDiv is missing, we can't show the spinner, but we proceed
        console.warn("Element with ID 'bookingResult' not found.");
    }

    try {
      const res = await fetch('/api/book-flight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, date })
      });
      
      if (!res.ok) throw new Error('Network error or server failed to respond.');
      
      const data = await res.json();
      const details = data.details || {};

      // Update the result area if it exists
      if (resultDiv) {
        resultDiv.innerHTML = `
          ✅ ${data.confirmation || 'Booking Confirmed'}<br>
          ✈️ ${details.flight || 'TBA'}<br>
          Departure: ${details.departure || 'N/A'}<br>
          Arrival: ${details.arrival || 'N/A'}
        `;
        resultDiv.classList.remove('opacity-0');
        resultDiv.classList.add('opacity-100');
      }

      // Update the map iframe if it exists
      if (mapFrame) {
        mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
      }

      showToast('✅ Flight booked!');
      speak(`Your flight to ${location} is confirmed for ${date}.`);

    } catch (err) {
      if (resultDiv) {
        resultDiv.innerHTML = '❌ Error booking flight.';
        resultDiv.classList.remove('opacity-0');
        resultDiv.classList.add('opacity-100');
      }
      showToast('❌ Failed to book flight.');
      console.error('Booking Error:', err);
    }
  });
}
