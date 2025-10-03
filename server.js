const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve popup.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'popup.html'));
});

// Proxy API requests to Flask backend
fetch('https://flight-booking-y6l6.onrender.com/api/weather?city=Lagos')
  .then(res => res.json())
  .then(data => console.log(data))


app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});

app.use((req, res, next) => {
  console.log(`🔁 Proxying: ${req.method} ${req.url}`);
  next();
});
