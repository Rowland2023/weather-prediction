// utils.js

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getAirportCode(city) {
  const codes = {
    Lagos: 'LOS',
    Abuja: 'ABV',
    London: 'LHR',
    'New York': 'JFK',
    Tokyo: 'HND'
  };
  return codes[city] || 'Unknown';
}

export function showResult(id, content) {
  const el = document.getElementById(id);
  el.innerHTML = content;
  el.style.opacity = 1;
}

export function hideResult(id) {
  const el = document.getElementById(id);
  el.style.opacity = 0;
}
