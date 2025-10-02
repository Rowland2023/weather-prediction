// weather.js
import { showToast, speak, showSpinner, iconMap } from './utils.js';

export function setupWeatherHandler() {
  const weatherBtn = document.getElementById('getWeatherBtn');

  weatherBtn.addEventListener('click', async () => {
    const city = document.getElementById('city').value.trim();
    const resultDiv = document.getElementById('weatherResult');
    const forecastDiv = document.getElementById('forecastCarousel');

    if (!city) {
      showToast('⚠️ Please enter a city.');
      return;
    }

    showSpinner(resultDiv);
    forecastDiv.innerHTML = '';

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      const icon = iconMap[data.condition] || '🌍';
      resultDiv.innerHTML = `${icon} ${data.description}, ${data.temperature}°C`;
      resultDiv.classList.remove('opacity-0');
      resultDiv.classList.add('opacity-100');
      showToast('✅ Weather fetched!');
      speak(`The weather in ${city} is ${data.description} at ${data.temperature} degrees.`);

      data.forecast.forEach(day => {
        const card = document.createElement('div');
        card.className = 'min-w-[80px] bg-white dark:bg-gray-800 p-2 rounded shadow text-center transition-transform duration-300 hover:scale-105';
        card.innerHTML = `
          <div class="text-lg">${iconMap[day.condition] || '🌍'}</div>
          <div class="text-sm font-medium">${day.day}</div>
          <div class="text-xs">${day.temp}°C</div>
        `;
        forecastDiv.appendChild(card);
      });
    } catch (err) {
      resultDiv.innerHTML = '❌ Error fetching weather.';
      resultDiv.classList.remove('opacity-0');
      resultDiv.classList.add('opacity-100');
      showToast('❌ Failed to fetch weather.');
      console.error(err);
    }
  });
}
