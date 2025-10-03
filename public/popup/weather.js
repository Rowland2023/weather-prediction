// weather.js

import { showToast, speak, showSpinner, iconMap } from './utils.js';

/**
 * Sets up the event listener for the weather button.
 */
export function setupWeatherHandler() {
  const weatherBtn = document.getElementById('getWeatherBtn');
  const cityInput = document.getElementById('city');
  const resultDiv = document.getElementById('weatherResult');
  const forecastDiv = document.getElementById('forecastCarousel');

  // Defensive checks
  if (!weatherBtn) {
    console.error("Element with ID 'getWeatherBtn' not found.");
    return;
  }
  if (!cityInput) {
    console.error("Element with ID 'city' not found.");
    return;
  }
  if (!resultDiv || !forecastDiv) {
    console.warn("Missing result or forecast container.");
  }

  weatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();

    if (!city) {
      showToast('⚠️ Please enter a city.');
      return;
    }

    if (resultDiv) {
      showSpinner(resultDiv);
    }
    if (forecastDiv) {
      forecastDiv.innerHTML = '';
    }

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      const icon = iconMap[data.condition] || '🌍';

      if (resultDiv) {
        resultDiv.innerHTML = `${icon} ${data.description}, ${data.temperature}°C`;
        resultDiv.classList.remove('opacity-0');
        resultDiv.classList.add('opacity-100');
      }

      showToast('✅ Weather fetched!');
      speak(`The weather in ${city} is ${data.description} at ${data.temperature} degrees.`);

      if (forecastDiv && Array.isArray(data.forecast)) {
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
      }
    } catch (err) {
      if (resultDiv) {
        resultDiv.innerHTML = '❌ Error fetching weather.';
        resultDiv.classList.remove('opacity-0');
        resultDiv.classList.add('opacity-100');
      }
      showToast('❌ Failed to fetch weather.');
      console.error('Weather Fetch Error:', err);
    }
  });
}
