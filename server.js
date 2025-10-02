const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/popup', express.static(path.join(__dirname, 'popup')));

// Proxy API requests to Flask backend
app.use('/api', createProxyMiddleware({
  target: 'https://flight-booking-y6l6.onrender.com',
  changeOrigin: true
}));

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
