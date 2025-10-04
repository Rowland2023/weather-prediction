import { showToast, speak, showSpinner, iconMap } from './utils.js';

export function setupWeatherHandler() {
  const weatherBtn = document.getElementById('getWeatherBtn');
  const cityInput = document.getElementById('location');
  const resultDiv = document.getElementById('weatherResult');

  if (!weatherBtn || !cityInput || !resultDiv) return;

  weatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (!city) return showToast('⚠️ Please enter a city.');

    showSpinner(resultDiv);
    resultDiv.innerHTML = '';

    try {
      const res = await fetch(`https://flight-booking-y6l6.onrender.com/api/weather?city=${encodeURIComponent(city)}`, {
        method: 'GET',
        mode: 'cors'
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      const icon = iconMap[data.condition] || iconMap.Default;

      resultDiv.innerHTML = `${icon} ${data.description}, ${data.temperature}°C`;
      resultDiv.classList.add('opacity-100');
      showToast('✅ Weather fetched!');
      speak(`The weather in ${city} is ${data.description} at ${data.temperature} degrees.`);
    } catch (err) {
      resultDiv.innerHTML = '❌ Error fetching weather.';
      showToast('❌ Failed to fetch weather.');
    }
  });
}
