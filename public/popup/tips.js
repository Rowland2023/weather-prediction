// tips.js

import { showToast } from './utils.js';

/**
 * Sets up the event listener for the travel tips button.
 */
export function setupTravelTips() {
  const tipsBtn = document.getElementById('getTipsBtn');
  const destinationInput = document.getElementById('destination');
  const resultDiv = document.getElementById('tipsResult');

  // Defensive checks
  if (!tipsBtn) {
    console.error("Element with ID 'getTipsBtn' not found.");
    return;
  }
  if (!destinationInput) {
    console.error("Element with ID 'destination' not found.");
    return;
  }
  if (!resultDiv) {
    console.warn("Element with ID 'tipsResult' not found.");
  }

  tipsBtn.addEventListener('click', async () => {
    const city = destinationInput.value.trim();

    if (!city) {
      showToast('⚠️ Please enter a destination.');
      return;
    }

    if (resultDiv) {
      resultDiv.innerHTML = '🧠 Gathering travel tips...';
      resultDiv.classList.remove('opacity-0');
      resultDiv.classList.add('opacity-100');
    }

    try {
      const res = await fetch(`/api/tips?city=${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      if (resultDiv) {
        resultDiv.innerHTML = `
          <strong>🧳 Packing:</strong> ${data.packing}<br><br>
          <strong>🛂 Visa:</strong> ${data.visa}<br><br>
          <strong>🛡️ Safety:</strong> ${data.safety}<br><br>
          <strong>🗣️ Etiquette:</strong> ${data.etiquette}
        `;
      }

      showToast('✅ Travel tips loaded!');
    } catch (err) {
      if (resultDiv) {
        resultDiv.innerHTML = '❌ Error fetching travel tips.';
      }
      showToast('❌ Failed to load tips.');
      console.error('Travel Tips Error:', err);
    }
  });
}
