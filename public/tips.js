// tips.js
import { showToast } from './popoup/utils.js';

export function setupTravelTips() {
  const tipsBtn = document.getElementById('getTipsBtn');

  tipsBtn.addEventListener('click', async () => {
    const city = document.getElementById('destination').value.trim();
    const resultDiv = document.getElementById('tipsResult');

    if (!city) {
      showToast('⚠️ Please enter a destination.');
      return;
    }

    resultDiv.innerHTML = '🧠 Gathering travel tips...';

    try {
      const res = await fetch(`/api/tips?city=${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      resultDiv.innerHTML = `
        <strong>🧳 Packing:</strong> ${data.packing}<br><br>
        <strong>🛂 Visa:</strong> ${data.visa}<br><br>
        <strong>🛡️ Safety:</strong> ${data.safety}<br><br>
        <strong>🗣️ Etiquette:</strong> ${data.etiquette}
      `;
      resultDiv.classList.remove('opacity-0');
      resultDiv.classList.add('opacity-100');
      showToast('✅ Travel tips loaded!');
    } catch (err) {
      resultDiv.innerHTML = '❌ Error fetching travel tips.';
      showToast('❌ Failed to load tips.');
      console.error(err);
    }
  });
}
